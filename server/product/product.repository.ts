import { Injectable } from '@nestjs/common';
import {
    createCategoryImgDto, createCategoryDro,
    CreateProductDto, createProductImgDto, createProductColorDto,
    createProductMaterialDto, createProductSizeDto
} from './dto';
import { BaseRepository } from '@/prisma/base.repository';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
@Injectable()
export class ProductRepository extends BaseRepository {

    constructor(prisma: PrismaService) {
        super(prisma);
    }

    async createCategory(data: createCategoryDro, tx?: Prisma.TransactionClient) {
        const client = tx ?? this.prisma;
        const newCategory = await client.category.create({
            data: {
                ...data,
                id_shop: data.id_shop,
            },
        });

        return newCategory;
    }

    async createCategoryImgs(data: createCategoryImgDto[], tx?: Prisma.TransactionClient) {
        const client = tx ?? this.prisma;
        const newCategoryImgs = await client.category_images.createMany({
            data,
        });

        return newCategoryImgs;
    }

    async create(data: CreateProductDto, tx?: Prisma.TransactionClient) {
        const client = tx ?? this.prisma;
        const newProduct = await client.product.create(
            { data }
        );
        return newProduct;
    }

    async createProductImgs(data: createProductImgDto[], tx?: Prisma.TransactionClient) {
        const client = tx ?? this.prisma;
        const newproductImgs = await client.product_Images.createMany({
            data,
        });

        return newproductImgs;
    }

    async createProductColors(data: createProductColorDto[], tx?: Prisma.TransactionClient) {
        const client = tx ?? this.prisma;
        const newProductColors = await client.color.createMany({
            data,
        });

        return newProductColors;
    }

    async createProductMaterials(data: createProductMaterialDto[], tx?: Prisma.TransactionClient) {
        const client = tx ?? this.prisma;
        const newProductColors = await client.material.createMany({
            data,
        });

        return newProductColors;
    }

    async createProductSizes(data: createProductSizeDto[], tx?: Prisma.TransactionClient) {
        const client = tx ?? this.prisma;
        const newProductSizes = await client.size.createMany({
            data,
        });

        return newProductSizes;
    }

    async getAll() {
        return this.prisma.product.findMany({
            include: {
                product_Images: true,
                colors: true,
                materials: true,
                sizes: true,
            },
            orderBy: {
                created_at: 'desc',
            },
        });
    };

    async getAllCategory() {
        return this.prisma.category.findMany({
            include: {
                images: true
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    };

    async getProductById(id: string) {
        const res = await this.prisma.product.findUnique({
            where: { id: id },
            include: {
                colors: true,
                materials: true,
                product_Images: true,
                rates: true,
                sizes: true
            }
        })

        return res;
    }

    async getCategoryById(id: number) {
        const res = await this.prisma.category.findUnique(
            {
                where: { id: id },
            }
        )
        return res;
    }
}