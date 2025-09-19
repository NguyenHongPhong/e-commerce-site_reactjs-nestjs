import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { SizeController } from './size.controller';
import { SizeService } from './size.service';
import { SizeRepository } from './size.repository';
@Module({
    imports: [PrismaModule],
    controllers: [SizeController],
    providers: [SizeService, SizeRepository],
    exports: [SizeRepository]
})
export class SizeModule { }
