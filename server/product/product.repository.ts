import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateProductDtoInRepo } from './dto/products.dto';
@Injectable()
export class ProductRepository {
    constructor(private readonly prisma: PrismaService) {
    };

    async create(data: CreateProductDtoInRepo) {
        return await this.prisma.product.create(
            { data }
        );
    }

    async getAll() {
    };
}