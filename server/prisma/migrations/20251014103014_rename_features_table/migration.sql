/*
  Warnings:

  - You are about to drop the `featuresproduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `featuresproduct` DROP FOREIGN KEY `FeaturesProduct_product_id_fkey`;

-- DropTable
DROP TABLE `featuresproduct`;

-- CreateTable
CREATE TABLE `Features_Product` (
    `id` VARCHAR(191) NOT NULL,
    `feature` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Features_Product` ADD CONSTRAINT `Features_Product_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
