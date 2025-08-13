import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
    // Seed Roles
    await prisma.roles.createMany({
        data: [
            { id: 1, name: 'admin' },
            { id: 2, name: 'seller' },
            { id: 3, name: 'customer' },
            { id: 4, name: 'guest' }
        ],
        skipDuplicates: true // tránh lỗi nếu record đã tồn tại
    });

    // Seed UserStatus
    await prisma.user_Status.createMany({
        data: [
            { id: 1, name: 'active' },
            { id: 2, name: 'inactive' },
            { id: 3, name: 'pending' },
            { id: 4, name: 'suspended' },
            { id: 5, name: 'banned' }
        ],
        skipDuplicates: true
    });

    console.log('✅ Seed data successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
