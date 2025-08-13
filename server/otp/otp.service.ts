import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OtpService {
    private transporter;

    constructor(private readonly configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: configService.get<string>("GMAIL_BUSINESS"),
                pass: configService.get<string>("GMAIL_APP_PASSWORD"),
            },
        });
    }

    generateOtp(length = 6): string {
        return Math.floor(Math.random() * 10 ** length)
            .toString()
            .padStart(length, '0');
    }

    async sendOtp(email: string, otp: string) {
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}`,
        };

        await this.transporter.sendMail(mailOptions);
    }
}
