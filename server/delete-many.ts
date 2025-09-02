// prisma/delete-users.ts
import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
    try {
        const result = await prisma.category_images.deleteMany({});
        console.log(`Đã xóa ${result.count} user`);
    } catch (error) {
        console.error('Lỗi khi xóa user:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
