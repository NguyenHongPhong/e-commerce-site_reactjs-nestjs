import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { materialDto } from './dto';
@Injectable()
export class MaterialRepository {
    constructor(private readonly prisma: PrismaService) {
    };

    async insertMany(mateterialDto: materialDto[]) {
        return await this.prisma.material.createMany({
            data: mateterialDto,
            skipDuplicates: true,
        });
    }

    async getAll() {
    };
}