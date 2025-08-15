import { Controller, Post, Body, Res, Req, UnauthorizedException } from '@nestjs/common';
import { OtpService } from './otp.service';
import { Response, Request } from 'express';


@Controller('otp')
export class OtpController {
    constructor(private readonly otpService: OtpService) { }

    @Post('send')
    async sendOtp(@Body('email') email: string, @Res() res: Response) {
        const isEmailRegistered = await this.otpService.isEmailRegistered(email);
        if (isEmailRegistered) {
            const { emailVerify, otp, expires, flowId } = await this.otpService.generateOtp(email);
            await this.otpService.sendOtp(emailVerify, otp, expires);
            const { timeRemaining } = this.otpService.generateOtpToken(emailVerify, expires);
            return res.status(200).json({ success: true, timeRemaining, flowId });
        }

        res.status(404).json({ message: 'This gmail has not registered in this system yet' });
    }

    @Post('verify')
    async verifyOtp(@Body('flowId') flowId: string, @Body('otp') otp: string, @Body('numberVerifyOtp') numberVerifyOtp: number, @Req() req: Request, @Res() res: Response) {

        const verifyOtp = await this.otpService.verifyOtp(flowId, otp);
        if (verifyOtp) {
            return res.status(200).json({ message: "Verified successfully" });
        }

        // //khi user click đến 3 lần thất bại sẽ xóa cookie
        if (numberVerifyOtp === 1) {
            return res.status(404).json({ message: "Your OTP is incorrect. You only have 2 times to verify" });
        } else if (numberVerifyOtp === 2) {
            return res.status(404).json({ message: "Your OTP is incorrect. You only have 1 times to verify" });
        } else {
            return res.status(404).json({ message: "Your OTP is invalid. Get new OTP please !!!" });
        };

    }

    @Post('/delete-otp-has-expired')
    async deleteOtpHasExpired(@Body('id') id: string, @Req() req: Request, @Res() res: Response) {
        this.otpService.deleteOtpHasExpired(id);
        return res.status(200).json({ status: true });
    }
}
