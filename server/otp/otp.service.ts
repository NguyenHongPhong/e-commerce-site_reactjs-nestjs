import { Injectable, UnauthorizedException } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import OtpEmailTemplate from '../common/documents/OtpEmailTemplate';
import * as crypto from 'crypto';
import { OtpRepository } from './otp.repository';
import { CreateOtpDto } from './dto/create-otp';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OtpService {
    private transporter;
    private gmailBusiness: string;
    private jwtSecret: string;

    constructor(private readonly configService: ConfigService,
        private otpRepository: OtpRepository,
        private jwtService: JwtService) {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: this.configService.get<string>("GMAIL_BUSINESS"),
                pass: this.configService.get<string>("GMAIL_APP_PASSWORD"),
            },
        });

        this.gmailBusiness = this.configService.get<string>("GMAIL_BUSINESS")!;
        this.jwtSecret = this.configService.get<string>("JWT_SECRET")!;
    }

    async generateOtp(email: string) {
        const code = crypto.randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // hết hạn sau 2 phút
        const otp = new CreateOtpDto();
        otp.email = email;
        otp.code = code;
        otp.expiresAt = expiresAt;
        const addedOtp = await this.otpRepository.create(otp);
        return { emailVerify: addedOtp.email, otp: addedOtp.code, expires: addedOtp.expiresAt };
    }

    getMinutesLeft(expiresAt: Date): number {
        const now = Date.now();
        const diffMs = expiresAt.getTime() - now;
        return Math.floor(diffMs / (1000 * 60)); // trả về số nguyên phút
    }


    async sendOtp(email: string, otp: string, expire: Date) {
        const convertExpires = this.getMinutesLeft(expire);
        const mailOptions = {
            from: `"E-commerce" <${this.gmailBusiness}>`,
            to: email,
            subject: 'Your OTP Code',
            html: OtpEmailTemplate(otp, convertExpires),
        };

        await this.transporter.sendMail(mailOptions);
    }

    generateOtpToken(email: string, expiresInSeconds: Date) {
        const convertExpiresInSeconds = this.getMinutesLeft(expiresInSeconds);
        const payload = { email };
        return {
            otpToken: this.jwtService.sign(payload, { expiresIn: convertExpiresInSeconds + 'm' }),
            timeRemaining: convertExpiresInSeconds
        };
    }

    verifyToken(token: string) {
        try {
            const payload = this.jwtService.verify(token, { secret: this.jwtSecret });
            return payload;
        } catch (error) {
            throw new UnauthorizedException('The OTP has expired.');
        }
    }

    async authenticateOtp(payload: any, otp: string) {
        const isEmail = await this.otpRepository.findOtpByEmailAndCode(payload.email, otp);
        if (isEmail) {
            const deletedOtp = await this.otpRepository.deleteOtpById(isEmail.id);
            return deletedOtp;
        }
    }

    async deleteOtpHasExpired(payload: any) {
        const isEmail = await this.otpRepository.findOtpByEmail(payload.email);
        if (isEmail) {
            const deletedOtp = await this.otpRepository.deleteOtpById(isEmail.id);
            return deletedOtp;
        }
    }
}
