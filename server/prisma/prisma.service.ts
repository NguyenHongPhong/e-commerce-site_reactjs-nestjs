import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient, Prisma } from '../generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super({
            log: ['query', 'info', 'warn', 'error'],
            transactionOptions: {
                maxWait: 10000, // thời gian chờ lấy kết nối
                timeout: 60000, // thời gian tối đa chạy transaction
            },

        } as Prisma.PrismaClientOptions);
    }

    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        process.on('beforeExit', async () => {
            await app.close();
        });
    }

    /**
     * Wrapper transaction
     * @param callback callback nhận tx (TransactionClient)
     */
    async transaction<T>(callback: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
        return this.$transaction(callback);
    }
}
