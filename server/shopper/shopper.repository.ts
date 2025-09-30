import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { registerShopperDto } from './dto';
@Injectable()
export class ShopperRepository {
    constructor(private readonly prisma: PrismaService) {
    };

    async create(data: registerShopperDto) {
        return await this.prisma.shops.create(
            { data }
        );
    }

}