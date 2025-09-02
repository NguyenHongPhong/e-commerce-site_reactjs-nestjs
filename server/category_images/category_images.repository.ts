import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ImageInput } from './dto';
@Injectable()
export class CategoryImagesRepository {
    constructor(private readonly prisma: PrismaService) {
    };

    async insertMany(categoryId: string, images: ImageInput[]) {
        await this.prisma.category_images.createMany({
            data: images.map((img, index) => ({
                category_id: categoryId,
                url: img.url,
                publicId: img.public_id,
                main: index === 0 && true
            })),
            skipDuplicates: true, // optional: avoid inserting duplicates
        });

        const rs = await this.prisma.category_images.findMany({
            where: {
                category_id: categoryId
            },

        });
        return rs;
    }

    async insertOne(categoryId: string, image: ImageInput) {
        const result = await this.prisma.category_images.create({
            data: {
                category_id: categoryId,
                url: image.url,
                publicId: image.public_id,
                main: true
            },
        });

        return result; // returns the inserted row
    }

    async getAllByCategoryId(categoryId: string) {
        const rs = await this.prisma.category_images.findMany({
            where: {
                category_id: categoryId
            }
        })
        return rs;
    }
}
