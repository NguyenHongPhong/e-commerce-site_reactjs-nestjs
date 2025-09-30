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
        const categories = await this.prisma.category.findMany({
            include: {
                images: true,
            },
            orderBy: {
                createdAt: "desc", // mới nhất trước
            },
        });
        return categories;
    };
}