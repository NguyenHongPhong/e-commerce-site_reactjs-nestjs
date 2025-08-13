// otp/otp.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
    constructor(private readonly otpService: OtpService) { }

    @Post('send')
    async sendOtp(@Body('email') email: string) {
        const otp = this.otpService.generateOtp();
        await this.otpService.sendOtp(email, otp);

        // TODO: lưu OTP vào database hoặc cache (Redis) để verify sau
        return { message: 'OTP sent', otp }; // trả về otp chỉ để dev test
    }
}
