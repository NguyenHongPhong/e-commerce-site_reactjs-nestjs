/*
  Warnings:

  - Added the required column `publicId` to the `Category_images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` MODIFY `is_active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `category_images` ADD COLUMN `publicId` VARCHAR(191) NOT NULL;
