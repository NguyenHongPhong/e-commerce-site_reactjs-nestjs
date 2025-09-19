import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { ProductImgRepository } from './product.img.repository';
import { ProductImgService } from './product.img.service';
import { ProductImgController } from './product.img.controller';
@Module({
    imports: [PrismaModule],
    controllers: [ProductImgController],
    providers: [ProductImgRepository, ProductImgService],
    exports: [ProductImgRepository]
})
export class ProductImgModule { }
