import { Injectable, ConflictException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_STATUS } from '../common/constants/app.constant';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    private readonly saltRounds = 10;
    constructor(private userRepository: UserRepository) { }
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

        return this.userRepository.createUser(defaultData);
    }
}
