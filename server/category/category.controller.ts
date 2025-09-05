import {
    Controller,
    Post,
    Body,
    UploadedFiles,
    UseInterceptors,
    Get
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateCategoryDto } from './dto';
import { MulterUploadOptions } from '../config/cloudinary.config';
import { CategoryService } from './category.service';
@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post('create')
    @UseInterceptors(
        FileFieldsInterceptor([{ name: 'images', maxCount: 10 }], MulterUploadOptions),
    )
    create(
        @Body() body: CreateCategoryDto,
        @UploadedFiles() files: { images?: Express.Multer.File[] },
    ) {

        return this.categoryService.create(body, files.images ?? []);
    }

    @Get('getAll')
    getCategories() {
        return this.categoryService.getAll();
    }

}
