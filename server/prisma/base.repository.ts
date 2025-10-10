import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

export class BaseRepository {
    protected prisma: PrismaService;

    constructor(prisma: PrismaService) {
        this.prisma = prisma;
    }

    // Expose transaction cho các repo kế thừa
    $transaction<T>(callback: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
        return this.prisma.$transaction(callback);
    }
}
