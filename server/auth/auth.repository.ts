import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { createUserRole } from '@/user/dto';
@Injectable()
export class AuthRepository {
    constructor(private readonly prismaClient: PrismaService) { };
    findByField(field: string, value: string) {
        return this.prismaClient.user.findFirst({
            where: {
                [field]: value
            }
        });
    }

    async insertUserRole(data: createUserRole) {
        return this.prismaClient.user_Roles.create({ data });
    }

}