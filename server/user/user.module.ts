import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaClient } from '../generated/prisma';

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaClient],
})
export class UserModule { }
