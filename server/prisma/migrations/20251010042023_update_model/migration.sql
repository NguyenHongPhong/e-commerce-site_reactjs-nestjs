/*
  Warnings:

  - Made the column `description` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shop_id` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `rate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `product_id` on table `rate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `star_rating` on table `rate` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `rate` DROP FOREIGN KEY `Rate_product_id_fkey`;

-- DropIndex
DROP INDEX `Rate_product_id_fkey` ON `rate`;

-- AlterTable
ALTER TABLE `product` MODIFY `description` TEXT NOT NULL,
    MODIFY `shop_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `rate` MODIFY `user_id` VARCHAR(191) NOT NULL,
    MODIFY `product_id` VARCHAR(191) NOT NULL,
    MODIFY `star_rating` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Rate` ADD CONSTRAINT `Rate_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
