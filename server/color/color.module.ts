import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { ColorRepository } from './color.repository';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';

@Module({
    imports: [PrismaModule],
    controllers: [ColorController],
    providers: [ColorRepository, ColorService],
    exports: [ColorRepository]
})
export class ColorModule { }
