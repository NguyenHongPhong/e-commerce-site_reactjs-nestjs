import { Controller, Get, Res, Body, HttpException, HttpStatus, Query, Post } from '@nestjs/common';
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

            await this.authService.loginWithGoogle(code);

            const messageEncoded = encodeURIComponent('Register successfully');

            return res.redirect(`${this.clientUrl}/register?message=${messageEncoded}`);
        } catch (error) {
            const err = error as AxiosError;
            const messageFailed = encodeURIComponent('Register failed !!!!');
            return res.redirect(
                `${this.clientUrl}/register?error=${err}&message=${messageFailed}`
            );
        }

    }

    @Post('login')
    async login(@Body() body: any) {
        const { data } = body;
        const { accessToken } = await this.authService.logIn(data.email, data.password);

    }

}