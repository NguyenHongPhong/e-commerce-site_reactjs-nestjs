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

    async findShopperByIdUser(id: string) {
        const rs = await this.prisma.shops.findUnique(
            {
                where: {
                    user_id: id,
                },
            }
        );
        return rs;
    }

    async findShopById(id: string) {
        const res = await this.prisma.shops.findUnique(
            { where: { id: id } }
        )
        return res;
    }
}