/*
  Warnings:

  - You are about to drop the `productimages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `productimages`;

-- CreateTable
CREATE TABLE `Product_Images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `public_Id` VARCHAR(191) NOT NULL,
    `product_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
