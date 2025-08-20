import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { UserRepository } from '../user/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LocalStrategy } from './strategies/localStrategy';
@Module({
    imports: [PrismaModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET, //key secret để tạo token
            signOptions: { expiresIn: '15m' }, // access token hết hạn sau 15 phút
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository, UserRepository, LocalAuthGuard, LocalStrategy],
    exports: []
})
export class AuthModule { }
