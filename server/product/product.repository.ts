import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {
    createCategoryImgDto, createCategoryDro,
    CreateProductDto, createProductImgDto, createProductColorDto,
    createProductMaterialDto
} from './dto';
@Injectable()
export class ProductRepository {
    constructor(private readonly prisma: PrismaService) {
    };


    async createCategory(data: createCategoryDro) {
        const newCategory = await this.prisma.category.create({
            data: {
                ...data,
                id_shop: data.id_shop,
            },
        });

        return newCategory;
    }

    async createCategoryImgs(data: createCategoryImgDto[]) {
        const newCategoryImgs = await this.prisma.category_images.createMany({
            data,
        });

        return newCategoryImgs;
    }

    async create(data: CreateProductDto) {
        const newProduct = await this.prisma.product.create(
            { data }
        );
        return newProduct;
    }

    async createProductImgs(data: createProductImgDto[]) {
        const newproductImgs = await this.prisma.product_Images.createMany({
            data,
        });

        return newproductImgs;
    }

    async createProductColors(data: createProductColorDto[]) {
        const newProductColors = await this.prisma.color.createMany({
            data,
        });

        return newProductColors;
    }

    async createProductMaterials(data: createProductMaterialDto[]) {
        const newProductColors = await this.prisma.material.createMany({
            data,
        });

        return newProductColors;
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
}