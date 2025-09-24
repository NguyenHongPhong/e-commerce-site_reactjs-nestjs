/*
  Warnings:

  - You are about to drop the column `createAt` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `isShop` on the `user` table. All the data in the column will be lost.
  - Added the required column `id_shop` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` DROP COLUMN `createAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id_shop` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `isShop`;

-- CreateTable
CREATE TABLE `Shops` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `logo_url` VARCHAR(191) NULL,
    `banner_url` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `phone_number` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `location_lat` DOUBLE NULL,
    `location_lng` DOUBLE NULL,
    `is_verified` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Shops_user_id_key`(`user_id`),
    UNIQUE INDEX `Shops_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shop_Status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shop_id` VARCHAR(191) NOT NULL,
    `name` ENUM('active', 'suspended', 'closed') NOT NULL DEFAULT 'active',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Shops` ADD CONSTRAINT `Shops_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shop_Status` ADD CONSTRAINT `Shop_Status_shop_id_fkey` FOREIGN KEY (`shop_id`) REFERENCES `Shops`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_id_shop_fkey` FOREIGN KEY (`id_shop`) REFERENCES `Shops`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
