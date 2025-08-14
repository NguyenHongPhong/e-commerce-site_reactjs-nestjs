import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { OtpRepository } from './otp.repository';
import { JwtModule } from '@nestjs/jwt';


@Module({
    imports: [PrismaModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET
        }),
    ],
    controllers: [OtpController],
    providers: [OtpService, OtpRepository],
})
export class OtpModule { }
