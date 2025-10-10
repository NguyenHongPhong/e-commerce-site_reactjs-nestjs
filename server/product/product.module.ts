import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { ShopperModule } from '@/shopper/shopper.module';

@Module({
    imports: [PrismaModule, ShopperModule],
    controllers: [ProductController],
    providers: [ProductRepository, ProductService],
    exports: []
})
export class ProductModule { }
