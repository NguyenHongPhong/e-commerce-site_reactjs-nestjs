import { Injectable, HttpException, HttpStatus, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { UserRepository } from '../user/user.repository';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { USER_STATUS, ROLES } from '../common/constants/app.constant';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    private clientId: string;
    private clientSecret: string;
    private redirectUri: string;
    private oauth2Client: OAuth2Client;
    private jwtSecret: string;
    private jwtRefreshSecret: string;

    constructor(private configService: ConfigService, private authRepository: AuthRepository, private readonly userRepository: UserRepository) {
        this.clientId = this.configService.get<string>('GOOGLE_CLIENT_ID')!;
        this.clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET')!;
        this.redirectUri = this.configService.get<string>('GOOGLE_REDIRECT_URI')!;
        this.oauth2Client = new OAuth2Client(this.clientId, this.clientSecret, this.redirectUri);
        this.jwtSecret = this.configService.get<string>('JWT_SECRET')!;
        this.jwtRefreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET')!;
    }

    // Gửi request đổi code lấy token từ Google
    async getTokens(code: string) {
        const url = 'https://oauth2.googleapis.com/token';
        const values = {
            code,
            client_id: this.clientId,
            client_secret: this.clientSecret,
            redirect_uri: this.redirectUri,
            grant_type: 'authorization_code',
        };

        try {
            const res = await axios.post(url, new URLSearchParams(values).toString(), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });
            return res.data;
        } catch (error) {
            console.log(error);
            throw new HttpException('Failed to fetch tokens from Google', HttpStatus.BAD_REQUEST);
        }
    }

    // Giải mã id_token lấy thông tin user
    async verifyIdTokenOfGoogle(idToken: string) {
        try {
            const ticket = await this.oauth2Client.verifyIdToken({
                idToken,
                audience: this.clientId,
            });
            const payload = ticket.getPayload();
            if (!payload) throw new UnauthorizedException('Invalid ID token payload');
            return payload;
        } catch (error) {
            throw new UnauthorizedException('Invalid ID token');
        }
    }

    generateJwt(payload: any) {
        return jwt.sign(payload, this.jwtSecret);
    }

    generateRefreshToken(payload: any) {
        return jwt.sign(payload, this.jwtRefreshSecret, {
            expiresIn: '7d', // Refresh token sống 7 ngày
        });
    }
    // Hàm tổng hợp lấy token và giải mã user info
    async loginWithGoogle(code: string) {

        try {
            const tokens = await this.getTokens(code);
            const userInfo = await this.verifyIdTokenOfGoogle(tokens.id_token);
            // Tạo JWT riêng cho app dựa trên info user (ví dụ email, sub)

            const addedUser = await this.addUserProvider(userInfo);
            return addedUser;

        } catch (error) {
            console.log(error);
            throw new HttpException('Failed to login from Google', HttpStatus.BAD_REQUEST);
        }
    }

    async addUserProvider(userInfo: any) {
        const newUser = new CreateUserDto();
        newUser.first_name = userInfo.given_name;
        newUser.last_name = userInfo.family_name;
        newUser.email = userInfo.email;
        newUser.email_verified_at = userInfo.email_verified;
        newUser.username = userInfo.name;
        newUser.portrait = userInfo.picture;
        newUser.status_id = USER_STATUS.active;
        newUser.last_login_at = new Date().toISOString();
        newUser.password = "";
        newUser.email_verified_at = false;
        newUser.providerId = userInfo.sub;
        newUser.provider = "google";

        return await this.userRepository.createUser(newUser);

    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    async logIn(email: string, password: string) {
        const now = Math.floor(Date.now() / 1000);
        const isUserExisted = await this.authRepository.findByField("email", email);
        if (isUserExisted) {
            const isCorrectPassword = await this.comparePassword(password, isUserExisted.password);
            if (isCorrectPassword) {
                const accessToken = this.generateJwt({
                    sub: isUserExisted.id,       // Subject - ID của user trong DB của bạn, định danh duy nhất người sở hữu token
                    iss: "e-commerce",         // Issuer - ai phát hành token này (ở đây là hệ thống e-commerce của bạn)
                    aud: this.clientId,        // Audience - ai được phép sử dụng token (thường là clientId hoặc tên ứng dụng)
                    iat: now,                  // Issued At - thời điểm token được phát hành (timestamp, tính bằng giây)
                    exp: now + 60 * 60,        // Expiration Time - thời điểm token hết hạn (ở đây là sau 1 giờ)
                    nbf: now,                   // Not Before - nếu gọi và xử lý trước thời điểm này...token sẽ không hợp lệ (ở đây là hợp lệ ngay lập tức)
                    email: isUserExisted.email,
                    role: ROLES.customer,
                });

                const refreshToken = this.generateRefreshToken({
                    sub: isUserExisted.id,
                    iss: "e-commerce",
                    aud: this.clientId,
                    iat: now,
                });

                return { accessToken };
            } else {
                throw new UnauthorizedException('Invalid password');
            }
        } else {
            throw new NotFoundException('User not found');
        }
    }
}
