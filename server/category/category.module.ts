import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';
import { CategoryImagesRepository } from '../category_images/category_images.repository';
@Module({
    imports: [PrismaModule],
    controllers: [CategoryController],
    providers: [CategoryRepository, CategoryService, CategoryImagesRepository],
    exports: []
})
export class CategoryModule { }
