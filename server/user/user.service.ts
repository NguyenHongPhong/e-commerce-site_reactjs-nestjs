import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaClient) { }

    async create(data: CreateUserDto) {
        return this.prisma.user.create({ data });
    }

    async findAll() {
        return this.prisma.user.findMany();
    }
}
