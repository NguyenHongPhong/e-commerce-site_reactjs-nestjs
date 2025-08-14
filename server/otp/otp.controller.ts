import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { OtpService } from './otp.service';
import { Response, Request } from 'express';


@Controller('otp')
export class OtpController {
    constructor(private readonly otpService: OtpService) { }

    @Post('send')
    async sendOtp(@Body('email') email: string, @Res() res: Response) {
        const { emailVerify, otp, expires } = await this.otpService.generateOtp(email);
        await this.otpService.sendOtp(emailVerify, otp, expires);
        const { otpToken, timeRemaining } = this.otpService.generateOtpToken(emailVerify, expires);

        // Lưu cookie HTTP-only
        res.cookie('otpToken', otpToken, {
            httpOnly: true,
            secure: true, // dùng HTTPS mới bật
            sameSite: 'strict',
            maxAge: 5 * 60 * 1000, // 5 phút
        });

        return res.status(200).json({ success: true, timeRemaining });
    }

    @Post('verify')
    async verifyOtp(@Body('otp') otp: string, @Req() req: Request, @Res() res: Response) {
        const otpToken = req.cookies['otpToken'];
        const verifiedToken = this.otpService.verifyToken(otpToken);
        if (verifiedToken) {
            await this.otpService.authenticateOtp(verifiedToken, otp);
            return res.status(200).json({ success: true, message: "Your email has verified successfully" });
        }

        return res.status(401).json({ success: true, message: "Your email has verified fail" });
    }

    @Post('/delete-otp-has-expired')
    async deleteOtpHasExpired(@Req() req: Request, @Res() res: Response) {
        const otpToken = req.cookies['otpToken'];
        const verifiedToken = this.otpService.verifyToken(otpToken);
        if (verifiedToken) {
            await this.otpService.deleteOtpHasExpired(verifiedToken.email);
            res.clearCookie('otpToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });
            return res.status(200).json({
                success: true
            });
        }

    }

}
