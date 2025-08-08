import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaClient) { }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async findByEmailOrUserName(email: string, username: string) {
        return this.prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username },
                ],
            },
        });
    }


    async createUser(data: CreateUserDto) {
        return await this.prisma.user.create({ data });
    }


}
