import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { UserRepository } from '../user/user.repository';
import { PrismaClient } from '../generated/prisma';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { USER_STATUS } from '../common/constants/app.constant';


@Injectable()
export class AuthService {
    private clientId: string;
    private clientSecret: string;
    private redirectUri: string;
    private oauth2Client: OAuth2Client;
    private jwtSecret: string;
    private userRepository = new UserRepository(new PrismaClient());

    constructor(private configService: ConfigService) {
        this.clientId = this.configService.get<string>('GOOGLE_CLIENT_ID')!;
        this.clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET')!;
        this.redirectUri = this.configService.get<string>('GOOGLE_REDIRECT_URI')!;
        this.oauth2Client = new OAuth2Client(this.clientId, this.clientSecret, this.redirectUri);
        this.jwtSecret = this.configService.get<string>('JWT_SECRET')!;
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
            throw new HttpException('Failed to fetch tokens from Google', HttpStatus.BAD_REQUEST);
        }
    }

    // Giải mã id_token lấy thông tin user
    async verifyIdToken(idToken: string) {
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
        return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
    }

    // Hàm tổng hợp lấy token và giải mã user info
    async loginWithGoogle(code: string) {
        const tokens = await this.getTokens(code);
        const userInfo = await this.verifyIdToken(tokens.id_token);
        // Tạo JWT riêng cho app dựa trên info user (ví dụ email, sub)
        const jwtToken = this.generateJwt({
            email: userInfo.email,
            sub: userInfo.sub,
            name: userInfo.name,
        });

        return { jwtToken, userInfo };
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
        newUser.isShop = false;
        newUser.email_verified_at = false;

        const addedUser = this.addUserProvider(newUser);


    }
}
