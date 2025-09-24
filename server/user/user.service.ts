import { Injectable, ConflictException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto, createUserRole } from './dto';
import { USER_STATUS } from '../common/constants/app.constant';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { IResetPasswordUserDto } from './dto/reset-password-user.dto';
import { USER_ROLES } from '../common/constants/app.constant';
@Injectable()
export class UserService {
    private readonly saltRounds = 10;
    private jwtSecret: string;
    private jwtRefreshSecret: string;

    constructor(private userRepository: UserRepository, private configService: ConfigService) {
        this.jwtSecret = this.configService.get<string>("JWT_SECRET")!;
        this.jwtRefreshSecret = this.configService.get<string>("JWT_REFRESH_SECRET")!;
    }
    generateJwt(payload: any) {
        return jwt.sign(payload, this.jwtSecret);
    }

    verifyJwtToken(token: string) {
        try {
            const payload = jwt.verify(token, this.jwtSecret);
            return payload; // { sub: userId, iat, exp }
        } catch (err) {
            throw new Error('Invalid token');
        }
    }

    generateRefreshToken(payload: any) {
        return jwt.sign(payload, this.jwtRefreshSecret, {
            expiresIn: '1d', // Refresh token sống 1 ngày
        });
    }
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    async create(data: CreateUserDto) {
        let hashPassword = await this.hashPassword(data.password);
        let defaultData = { ...data, status_id: USER_STATUS.active, password: hashPassword };

        const isUsername = await this.userRepository.findByEmailOrUserName(defaultData.email, defaultData.username);
        if (isUsername) {
            throw new ConflictException('Email or username already exists');
        };

        const addedUser = await this.userRepository.createUser(defaultData);
        const userRole: createUserRole = { user_id: addedUser.id, role_id: USER_ROLES.user };
        await this.userRepository.insertUserRole(userRole);
        return {
            status: true,
            message: 'Register successfully !!!',
        };
    }

    findById(id: string) {
        const user = this.userRepository.findById(id);
        if (user) {
            return user;
        } else {
            throw new NotFoundException('Not found user');
        }
    }

    async updateNewPasswordByEmail(data: IResetPasswordUserDto) {
        let hashPassword = await this.hashPassword(data.newPassword);
        const updatedUser = await this.userRepository.updatePasswordByEmail(data.email, hashPassword);
        if (updatedUser) {
            return { message: "Reset password success. Now you can log in !!!" };
        }
        throw new InternalServerErrorException("Server error !!!");
    }

    async getProfile(id: string) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException("Not found profile");
        }

        await this.userRepository.updateByField(user.id, new Date(), "id", "last_login_at");

        const { password, providerId, updated_at, last_login_at, ...result } = user;
        return result;
    }
}
