import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';

@Module({
    imports: [PrismaModule],
    controllers: [ProductController],
    providers: [ProductRepository],
    exports: []
})
export class ProductModule { }
