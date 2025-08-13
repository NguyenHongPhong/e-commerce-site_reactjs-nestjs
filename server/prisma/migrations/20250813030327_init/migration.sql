-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `status_id` INTEGER NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `portrait` VARCHAR(191) NULL,
    `phone_number` VARCHAR(191) NULL,
    `isShop` BOOLEAN NOT NULL DEFAULT false,
    `email_verified_at` BOOLEAN NOT NULL DEFAULT false,
    `last_login_at` DATETIME(3) NULL,
    `providerId` VARCHAR(191) NULL,
    `provider` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_Status` (
    `id` INTEGER NOT NULL,
    `name` ENUM('active', 'inactive', 'pending', 'suspended', 'banned') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Roles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
