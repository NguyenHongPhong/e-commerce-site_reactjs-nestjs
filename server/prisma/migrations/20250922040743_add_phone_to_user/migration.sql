-- AlterTable
ALTER TABLE `category` MODIFY `description` TEXT NULL;

-- AddForeignKey
ALTER TABLE `Category_images` ADD CONSTRAINT `Category_images_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
