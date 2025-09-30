import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, createUserRole } from './dto';
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

    async createUser(newUser: CreateUserDto) {
        return this.prisma.user.create({
            data: {
                ...newUser,
                last_login_at: new Date()
            }
        });
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

    async updateByField(id: string, value: any, fieldFinding: string, fieldUpdate: string) {
        const row = await this.prisma.user.findFirst({
            where: { [fieldFinding]: id },
        });

        if (!row) throw new Error('Not found');

        return await this.prisma.user.update({
            where: { id: row.id },
            data: { [fieldUpdate]: value },
        });
    }

    async insertUserRole(data: createUserRole) {
        return this.prisma.user_Roles.create({ data });
    }

    async findPhoneNumberById(id: string) {
        const user = await this.prisma.user.findFirst({
            where: { id: id },
        });

        if (user) {
            const { phone_number } = user;
            return phone_number;
        }
    }
}
