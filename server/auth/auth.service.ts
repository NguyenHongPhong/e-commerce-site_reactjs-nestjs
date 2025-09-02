import { Injectable, HttpException, HttpStatus, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
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
    private redirectLoginUri: string;
    private oauth2Client: OAuth2Client;
    private readonly ACCESS_TTL = 60 * 1;        // 5 phút (giây)
    private readonly REFRESH_TTL = 60; // 7 ngày (giây)

    constructor(private configService: ConfigService, private authRepository: AuthRepository,
        private readonly userRepository: UserRepository, private jwtService: JwtService,) {
        this.clientId = this.configService.get<string>('GOOGLE_CLIENT_ID')!;
        this.clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET')!;
        this.redirectUri = this.configService.get<string>('GOOGLE_REDIRECT_URI')!;
        this.redirectLoginUri = this.configService.get<string>('GOOGLE_REDIRECT_LOGIN_URI')!;
        this.oauth2Client = new OAuth2Client(this.clientId, this.clientSecret, this.redirectUri);
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

    // Hàm tổng hợp lấy token và giải mã user info
    async registerWithGoogle(code: string) {
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

    // Gửi request đổi code lấy token từ Google
    async getTokensForLogin(code: string) {
        const url = 'https://oauth2.googleapis.com/token';
        const values = {
            code,
            client_id: this.clientId,
            client_secret: this.clientSecret,
            redirect_uri: this.redirectLoginUri,
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
    // Hàm tổng hợp lấy token và giải mã user info
    async loginWithGoogle(code: string) {

        try {
            const tokens = await this.getTokensForLogin(code);
            const userInfo = await this.verifyIdTokenOfGoogle(tokens.id_token);
            // Tạo JWT riêng cho app dựa trên info user (ví dụ email, sub)
            if (userInfo.email) {
                const isRegistered = await this.authRepository.findByField('email', userInfo.email);
                if (isRegistered) {
                    return await this.logIn(isRegistered);
                }
                throw new NotFoundException("This email has not registered yet !!!")
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error; // let Nest handle it
            }
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

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findByEmail(email);
        if (user && await this.comparePassword(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async logIn(user: any) {
        const accessToken = await this.jwtService.signAsync({
            sub: user.id,       // Subject - ID của user trong DB của bạn, định danh duy nhất người sở hữu token
            iss: "e-commerce",         // Issuer - ai phát hành token này (ở đây là hệ thống e-commerce của bạn)
            role: ROLES.customer,
        }, { expiresIn: this.ACCESS_TTL + '15m' });

        // refreshToken (dài hạn, dùng để cấp lại accessToken)
        const refreshToken = await this.jwtService.signAsync({
            sub: user.id,
            role: ROLES.customer,
        }, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: '1h',
        });

        const server_now = Math.floor(Date.now() / 1000);
        const decoded: any = this.jwtService.decode(accessToken);
        const exp = decoded?.exp as number;
        const expires_in = Math.max(0, exp - server_now); //số giây còn lại

        return { accessToken: accessToken, refreshToken: refreshToken, expiresIn: expires_in, serverNow: server_now };
    }

    async rotate(id: string) {
        let accessToken;
        let refreshToken;
        let data;
        let expires_in;
        let server_now;
        const user = await this.authRepository.findByField("id", id);
        if (!user) {
            throw new UnauthorizedException("Unauthorized !!!!")
        }
        if (user) {
            accessToken = await this.jwtService.signAsync({
                sub: user.id,       // Subject - ID của user trong DB của bạn, định danh duy nhất người sở hữu token
                iss: "e-commerce",         // Issuer - ai phát hành token này (ở đây là hệ thống e-commerce của bạn)
                role: ROLES.customer,
            }, { expiresIn: '15m' });

            refreshToken = await this.jwtService.signAsync({
                sub: user.id,
                role: ROLES.customer,
            }, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: '1h',
            });
            const { password, providerId, updated_at, created_at, ...result } = user;
            const decoded: any = this.jwtService.decode(accessToken);
            const exp = decoded?.exp as number;
            data = result;
            server_now = Math.floor(Date.now() / 1000);
            expires_in = Math.max(0, exp - server_now); //số giây còn lại
        }

        return { newAccessToken: accessToken, newRefreshToken: refreshToken, userInfo: data, expiresIn: expires_in, serverNow: server_now };
    }
}
