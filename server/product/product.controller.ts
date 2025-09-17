import { Controller, Post, Body, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto';
@Controller('products')
export class ProductController {

    @Post('create')
    @UseInterceptors(FilesInterceptor('imgs')) // tên field 'imgs' trùng với formData
    create(
        @UploadedFiles() imgs: Express.Multer.File[],
        @Body() body: CreateProductDto
    ) {
        console.log('Imgs:', imgs);         // array file
        console.log('Body:', body);         // title, description, price, category, colors[], materials[]
    }
}
