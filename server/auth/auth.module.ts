import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { UserRepository } from '../user/user.repository';

@Module({
    imports: [PrismaModule],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository, UserRepository],
    exports: []
})
export class AuthModule { }
