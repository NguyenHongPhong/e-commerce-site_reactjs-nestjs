import { Controller, Post, Body, UploadedFiles, UseInterceptors, Get, UseGuards } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto';
import { MulterUploadOptions } from '@/config/cloudinary.config';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {

    }
    //Authenticate router
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @UseInterceptors(FilesInterceptor('imgs', 10, MulterUploadOptions)) // tên field 'imgs' trùng với formData
    create(
        @UploadedFiles() files: Express.Multer.File[],
        @Body() body: CreateProductDto
    ) {
        return this.productService.create(body, files ?? []);
    }

    @Get('getAll')
    getProducts() {
        return this.productService.getAll();
    }
}
