import { Controller, Get, Res, Req, HttpException, HttpStatus, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';



@Controller('auth')
export class AuthController {
    private clientUrl: string;
    constructor(
        private readonly authService: AuthService,
        private configService: ConfigService
    ) {

        this.clientUrl = this.configService.get<string>('CLIENT_URL')!;
    }

    // Route xử lý callback sau khi Google redirect về
    @Get('callback')
    async googleCallback(@Query('code') code: string, @Res() res: Response) {
        try {
            if (!code) {
                throw new HttpException('Authorization code is missing', HttpStatus.BAD_REQUEST);
            }

            // // Lấy token và gửi về phía client
            const { accessToken, refreshToken } = await this.authService.loginWithGoogle(code);

            // Lưu refresh token vào cookie HTTP-only
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // chỉ bật secure khi production
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
            });

            const accessTokenEncoded = encodeURIComponent(accessToken);
            const messageEncoded = encodeURIComponent('Register successfully');

            return res.redirect(`${this.clientUrl}/register?accessToken=${accessTokenEncoded}&message=${messageEncoded}`);
        } catch (error) {
            const err = error as AxiosError;
            return res.redirect(
                `${this.clientUrl}/register?error=${err}`
            );
        }

    }

}