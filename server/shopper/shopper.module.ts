import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { ShopperController } from './shopper.controller';
import { ShopperService } from './shopper.service';
import { ShopperRepository } from './shopper.repository';
import { UserModule } from '@/user/user.module';
@Module({
    imports: [PrismaModule, UserModule],
    controllers: [ShopperController],
    providers: [ShopperService, ShopperRepository],
    exports: []
})
export class ShopperModule { }

