import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { UserRepository } from '../user/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LocalStrategy } from './strategies/localStrategy';
import { RefreshJwtStrategy } from './strategies/refreshJwtStrategy';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';
@Module({
    imports: [PrismaModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET, //key secret để tạo token
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository, UserRepository,
        LocalAuthGuard, LocalStrategy,
        RefreshJwtStrategy, RefreshJwtGuard
    ],
    exports: []
})
export class AuthModule { }
