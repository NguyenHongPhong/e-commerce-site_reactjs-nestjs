import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

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
}