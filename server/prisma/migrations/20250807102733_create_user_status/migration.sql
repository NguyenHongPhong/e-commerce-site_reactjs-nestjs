-- CreateTable
CREATE TABLE `UserStatus` (
    `id` VARCHAR(191) NOT NULL,
    `name` ENUM('active', 'inactive', 'pending', 'suspended', 'banned') NOT NULL DEFAULT 'active',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
