import { Controller, Post, Body, UploadedFiles, UseInterceptors, Get, UseGuards } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
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
    @UseInterceptors(
        AnyFilesInterceptor(MulterUploadOptions)
    )
    create(
        @UploadedFiles() files: Express.Multer.File[],
        @Body('product') productJson: string,
        @Body('category') categoryJson: string,
    ) {
        const productFiles = files.filter(f => f.fieldname === 'productImgs');
        const categoryFiles = files.filter(f => f.fieldname === 'categoryImgs');

        const productData = JSON.parse(productJson);
        const categoryData = JSON.parse(categoryJson);
    }


    @Get('getAll')
    getProducts() {
        return this.productService.getAll();
    }
}
