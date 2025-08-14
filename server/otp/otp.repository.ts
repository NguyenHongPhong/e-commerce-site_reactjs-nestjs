import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp';
@Injectable()
export class OtpRepository {
    constructor(private readonly prismaService: PrismaService) { };
    create(otp: CreateOtpDto) {
        return this.prismaService.otp.create({ data: otp });
    }

    findOtpByEmailAndCode(email: string, code: string) {
        const otpRecord = this.prismaService.otp.findFirst({
            where: {
                email,
                code
            },
        });
        return otpRecord;
    }

    findOtpByEmail(email: string) {
        const otpRecord = this.prismaService.otp.findFirst({
            where: {
                email
            },
        });
        return otpRecord;
    }

    async deleteOtpById(id: string) {
        return await this.prismaService.otp.delete({
            where: {
                id: id,
            },
        });
    }

}