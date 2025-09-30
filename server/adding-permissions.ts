// prisma/seed.ts
import { PrismaClient, UserStatusName } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
    // 1️⃣ Thêm User Statuses
    const statuses: UserStatusName[] = [
        UserStatusName.active,
        UserStatusName.inactive,
        UserStatusName.pending,
        UserStatusName.suspended,
        UserStatusName.banned,
    ];

    for (const status of statuses) {
        await prisma.user_Status.upsert({
            where: { name: status },
            update: {},
            create: { name: status },
        });
    }
    console.log("User statuses inserted/updated successfully.");

    // 2️⃣ Thêm Roles
    const userRole = await prisma.roles.upsert({
        where: { name: "USER" },
        update: {},
        create: { name: "USER" },
    });

    const shopperRole = await prisma.roles.upsert({
        where: { name: "SHOPPER" },
        update: {},
        create: { name: "SHOPPER" },
    });

    const adminRole = await prisma.roles.upsert({
        where: { name: "ADMIN" },
        update: {},
        create: { name: "ADMIN" },
    });

    // 3️⃣ Thêm Actions
    const actionsData = [
        // USER
        "view_product",
        "view_category",
        "order_delivery",
        "payment",
        "watch_order_delivery",
        "watch_cart",
        "write_review",
        "chat_to_shop",
        // SHOPPER
        "adding_category",
        "updating_category",
        "deleting_category",
        "adding_product",
        "updating_product",
        "deleting_product",
        "manage_inventory",
        "watch_own_orders",
        "manage_orders",
        "answering_review",
        "chat_to_user",
    ];

    const actions: { [key: string]: any } = {};

    for (const actionName of actionsData) {
        const action = await prisma.actions.upsert({
            where: { action_name: actionName },
            update: {},
            create: { action_name: actionName },
        });
        actions[actionName] = action;
    }

    // 4️⃣ Tạo Permissions dựa trên Actions
    const permissions: { [key: string]: any } = {};
    for (const actionName in actions) {
        const perm = await prisma.permissions.upsert({
            where: { action_id: actions[actionName].id },
            update: {},
            create: { action_id: actions[actionName].id },
        });
        permissions[actionName] = perm;
    }

    // 5️⃣ Gán quyền cho Roles
    const userPermissions = [
        "view_product",
        "view_category",
        "order_delivery",
        "payment",
        "watch_order_delivery",
        "watch_cart",
        "write_review",
        "chat_to_shop",
    ];

    const shopperPermissions = [
        "view_category",
        "adding_category",
        "updating_category",
        "deleting_category",
        "view_product",
        "adding_product",
        "updating_product",
        "deleting_product",
        "manage_inventory",
        "watch_own_orders",
        "manage_orders",
        "answering_review",
        "chat_to_user",
    ];

    for (const permName of userPermissions) {
        await prisma.role_Permissions.upsert({
            where: {
                role_id_permission_id: {
                    role_id: userRole.id,
                    permission_id: permissions[permName].id,
                },
            },
            update: {},
            create: {
                role_id: userRole.id,
                permission_id: permissions[permName].id,
            },
        });
    }

    for (const permName of shopperPermissions) {
        await prisma.role_Permissions.upsert({
            where: {
                role_id_permission_id: {
                    role_id: shopperRole.id,
                    permission_id: permissions[permName].id,
                },
            },
            update: {},
            create: {
                role_id: shopperRole.id,
                permission_id: permissions[permName].id,
            },
        });
    }

    console.log("Roles, actions, permissions seeded successfully.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
