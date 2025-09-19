import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { createProductImgDto } from './dto';

@Injectable()
export class ProductImgRepository {
    constructor(private readonly prisma: PrismaService) {
    };

    async insertMany(productImgDto: createProductImgDto[]) {
        return await this.prisma.product_Images.createMany({
            data: productImgDto,
            skipDuplicates: true,
        });
    }

    async getAll() {
    };
}