import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryImagesRepository } from './category_images.repository';
@Module({
    imports: [PrismaModule],
    controllers: [],
    providers: [CategoryImagesRepository],
    exports: [CategoryImagesRepository]
})
export class CategoryImagesModule { }
