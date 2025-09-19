import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { sizeDto } from './dto';

@Injectable()
export class SizeRepository {
    constructor(private readonly prisma: PrismaService) {
    };

    async insertMany(sizeDto: sizeDto[]) {
        return await this.prisma.size.createMany({
            data: sizeDto,
            skipDuplicates: true,
        });
    }

    async getAll() {
    };
}