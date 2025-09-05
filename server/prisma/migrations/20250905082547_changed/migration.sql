-- AlterTable
ALTER TABLE `product` MODIFY `rate_star` DOUBLE NULL DEFAULT 0,
    MODIFY `rate_count` INTEGER NULL DEFAULT 0,
    MODIFY `sold` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `rate` MODIFY `user_id` VARCHAR(191) NULL,
    MODIFY `product_id` INTEGER NULL,
    MODIFY `star_rating` INTEGER NULL;
