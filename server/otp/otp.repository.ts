import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp';
@Injectable()
export class OtpRepository {
    constructor(private readonly prismaService: PrismaService) { };
    create(otp: CreateOtpDto) {
        return this.prismaService.otp.create({ data: otp });
    }

    findOtpByIdAndCode(id: string, code: string) {
        const otpRecord = this.prismaService.otp.findFirst({
            where: {
                id,
                code,
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

    async findById(id: string) {
        const otpRecord = this.prismaService.otp.findFirst({
            where: {
                id
            },
        });
        return otpRecord;
    }



}