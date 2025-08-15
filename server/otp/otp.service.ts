import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import OtpEmailTemplate from '../common/documents/OtpEmailTemplate';
import * as crypto from 'crypto';
import { OtpRepository } from './otp.repository';
import { CreateOtpDto } from './dto/create-otp';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class OtpService {
    private transporter;
    private gmailBusiness: string;
    private jwtSecret: string;

    constructor(private readonly configService: ConfigService,
        private otpRepository: OtpRepository,
        private jwtService: JwtService,
        private userRepository: UserRepository
    ) {
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
        return { emailVerify: addedOtp.email, otp: addedOtp.code, expires: addedOtp.expiresAt, flowId: addedOtp.id };
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

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.log(error);
        }
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
        try {
            const isEmail = await this.otpRepository.findOtpByEmailAndCode(payload.email, otp);
            if (isEmail) {
                const deletedOtp = await this.otpRepository.deleteOtpById(isEmail.id);
                return deletedOtp;
            } else {
                throw new UnauthorizedException('The OTP has expired.');
            }
        } catch (error) {

        }
    }

    async deleteOtpHasExpired(id: string) {
        try {
            const isEmail = await this.otpRepository.findById(id);
            if (isEmail) {
                const updatedOtp = this.otpRepository.updateById(isEmail.id);
                return updatedOtp;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async isEmailRegistered(email: string) {
        try {
            const isEmailExisted = await this.userRepository.findByEmail(email);
            if (isEmailExisted) {
                return isEmailExisted;
            }
            throw new NotFoundException("This email has not registered.");
        } catch (error) {
        }
    }

    async verifyOtp(id: string, otp: string) {
        try {
            const isOtpExisted = await this.otpRepository.findById(id);
            if (isOtpExisted && !isOtpExisted.isExpired) {
                const isOtpCorrect = await this.otpRepository.findOtpByCode(otp);
                if (isOtpCorrect) {
                    return isOtpCorrect;
                }
                throw new NotFoundException("Your OTP is incorrect.");
            }
            throw new NotFoundException("Your OTP is has expired.");
        } catch (error) {
            console.log(error);
        }
    }
}
