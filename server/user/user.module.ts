import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaClient } from '../generated/prisma';
import { UserRepository } from './user.repository';

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaClient, UserRepository],
})
export class UserModule { }
