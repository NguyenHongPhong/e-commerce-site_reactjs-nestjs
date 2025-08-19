import { GoneException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import OtpEmailTemplate from '../common/documents/OtpEmailTemplate';
import * as crypto from 'crypto';
import { OtpRepository } from './otp.repository';
import { CreateOtpDto } from './dto/create-otp';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class OtpService {
    private transporter;
    private gmailBusiness: string;
    private readonly TTL_SEC = 60;      // 120s

    constructor(private readonly configService: ConfigService,
        private otpRepository: OtpRepository,
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
    }

    async generateOtp(email: string) {
        const now = new Date();
        const code = crypto.randomInt(100000, 999999).toString();
        const expiresAt = new Date(now.getTime() + this.TTL_SEC * 1000); // hết hạn sau 2 phút
        const otp = new CreateOtpDto();
        otp.email = email;
        otp.code = code;
        otp.expiresAt = expiresAt;
        const addedOtp = await this.otpRepository.create(otp);
        await this.sendOtp(addedOtp.email, addedOtp.code, addedOtp.expiresAt);
        return {
            flowId: addedOtp.id,
            expiresAt: addedOtp.expiresAt.toISOString(), // UTC ISO
            serverNow: now.toISOString(),
        };
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

    async authenticateOtp(id: string, otp: string) {
        const validOtp = await this.otpRepository.findOtpByIdAndCode(id, otp);

        if (!validOtp) {
            throw new NotFoundException("Invalid OTP");
        };

        if (validOtp) {
            if (validOtp.expiresAt.getTime() <= Date.now()) {
                throw new GoneException("This OTP has expired");
            };
        };

        const deletedOtp = await this.otpRepository.deleteOtpById(id);

        return { message: "Verified successfully", gmailVerified: deletedOtp.email };
    }

    async resendOtp(flowIdFromSection: string) {
        const otp = await this.otpRepository.findById(flowIdFromSection);
        if (!otp) {
            console.log(new NotFoundException("Not found flow id"));
        }
        if (otp) {
            const recipientEmail = otp.email;
            const { flowId, expiresAt, serverNow } = await this.generateOtp(recipientEmail);
            await this.otpRepository.deleteOtpById(flowIdFromSection);
            return {
                flowId: flowId,
                expiresAt: expiresAt,
                serverNow: serverNow,
                message: "We have just sent new OTP, check it please !!!"
            };
        }
    }


}
