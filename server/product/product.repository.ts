import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ProductRepository {
    constructor(private readonly prisma: PrismaService) {
    };

    async create() {

    }

    async getAll() {
    };
}