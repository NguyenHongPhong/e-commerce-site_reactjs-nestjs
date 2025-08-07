import { PrismaClient, UserStatusName } from './generated/prisma'

const prisma = new PrismaClient()

async function main() {
    await prisma.user_Status.createMany({
        data: [
            { id: 1, name: UserStatusName.active },
            { id: 2, name: UserStatusName.inactive },
            { id: 3, name: UserStatusName.pending },
            { id: 4, name: UserStatusName.suspended },
            { id: 5, name: UserStatusName.banned },
        ],
        skipDuplicates: true, // Tránh lỗi nếu đã có trong DB
    })

    console.log('✅ Đã chèn 5 status vào bảng user_status.')
}

main()
    .catch((e) => {
        console.error('❌ Lỗi khi insert:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

//OPTIONAL:ts-node insert-many.ts
