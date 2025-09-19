import {
    Controller,
    Post,
    Body,
    UploadedFiles,
    UseInterceptors,
    Get,
    UseGuards
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateCategoryDto } from './dto';
import { MulterUploadOptions } from '../config/cloudinary.config';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    //Authenticate router
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @UseInterceptors(
        FileFieldsInterceptor([{ name: 'images', maxCount: 10 }], MulterUploadOptions),
    )
    create(
        @Body() body: CreateCategoryDto,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        return this.categoryService.create(body, files ?? []);
    }

    @Get('getAll')
    getCategories() {
        return this.categoryService.getAll();
    }

}
