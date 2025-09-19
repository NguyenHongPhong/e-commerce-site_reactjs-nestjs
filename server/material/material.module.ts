import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { MaterialRepository } from './material.repository';
import { MatreialService } from './material.service';
import { MaterialController } from './material.controller';
@Module({
    imports: [PrismaModule],
    controllers: [MaterialController],
    providers: [MaterialRepository, MatreialService],
    exports: [MaterialRepository]
})
export class MaterialModule { }
