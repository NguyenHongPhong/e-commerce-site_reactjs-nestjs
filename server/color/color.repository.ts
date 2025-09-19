import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { colorDto } from './dto';
@Injectable()
export class ColorRepository {
    constructor(private readonly prisma: PrismaService) {
    };
    async insertMany(colorDto: colorDto[]) {
        return await this.prisma.color.createMany({
            data: colorDto,
            skipDuplicates: true,
        });
    }
}