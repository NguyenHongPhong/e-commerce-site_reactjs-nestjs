import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserRepository } from './user.repository';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [UserService, UserRepository, JwtAuthGuard, JwtStrategy],
    exports: [UserRepository]
})
export class UserModule { }
