import { Controller, Get, Query, Res, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // Route xử lý callback sau khi Google redirect về
    @Get('callback')
    async googleCallback(@Query('code') code: string, @Res() res: Response) {
        if (!code) {
            throw new HttpException('Authorization code is missing', HttpStatus.BAD_REQUEST);
        }


        // // Lấy token từ Google và thông tin user
        const { userInfo, jwtToken } = await this.authService.loginWithGoogle(code);

        console.log(userInfo);


        // // TODO: lưu user vào DB hoặc tạo session/JWT

        // // Trả về thông tin user (demo)
        // return res.json({ user: userInfo, tokens });
    }
}
