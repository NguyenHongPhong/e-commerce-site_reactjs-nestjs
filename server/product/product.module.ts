import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { ColorModule } from '@/color/color.module';
import { MaterialModule } from '@/material/material.module';
import { SizeModule } from '@/size/size.module';
import { ProductImgModule } from '@/product_img/product.img.module';
@Module({
    imports: [PrismaModule, ColorModule, MaterialModule, SizeModule, ProductImgModule],
    controllers: [ProductController],
    providers: [ProductRepository, ProductService],
    exports: []
})
export class ProductModule { }
