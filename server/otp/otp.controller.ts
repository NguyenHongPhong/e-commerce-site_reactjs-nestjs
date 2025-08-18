import { Controller, Post, Body, Res } from '@nestjs/common';
import { OtpService } from './otp.service';
import { Response, Request } from 'express';
import { VerifyOtpDto } from './dto/verify-otp';
import { SendOtpDto } from './dto/send-otp';
import { ResendOtpDto } from './dto/resend-otp';

@Controller('otp')
export class OtpController {
    constructor(private readonly otpService: OtpService) { }

    @Post('send')
    async sendOtp(@Body() dto: SendOtpDto, @Res() res: Response) {
        const { flowId, serverNow, expiresAt } = await this.otpService.generateOtp(dto.email);
        return res.status(200).json({ flowId: flowId, serverNow, expiresAt });
    }

    @Post('verify')
    verifyOtp(@Body() dto: VerifyOtpDto) {
        return this.otpService.authenticateOtp(dto.flowId, dto.otp);
    }

    @Post('/re-send')
    resendOtp(@Body() dto: ResendOtpDto) {
        return this.otpService.resendOtp(dto.flowId);
    }
}
