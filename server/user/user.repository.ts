import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) { }

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
        return this.prisma.user.create({ data });
    }

    findById(id: string) {
        return this.prisma.user.findUnique({
            where: {
                id: id,
            },
        })
    }

    updatePasswordByEmail(email: string, newPassword: string) {
        return this.prisma.user.update({
            where: { email },
            data: {
                password: newPassword
            },
        });

    };
}
