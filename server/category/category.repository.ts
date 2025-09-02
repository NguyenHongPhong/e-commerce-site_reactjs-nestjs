import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/category';
@Injectable()
export class CategoryRepository {
    constructor(private readonly prisma: PrismaService) {
    };

    async create(data: CreateCategoryDto) {
        return await this.prisma.category.create(
            { data }
        );
    }

    async getAll() {
        return await this.prisma.category.findMany();
    };
}