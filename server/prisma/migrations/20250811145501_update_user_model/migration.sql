/*
  Warnings:

  - You are about to drop the `user_providers` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `provider` VARCHAR(191) NULL DEFAULT 'google',
    ADD COLUMN `providerId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `user_providers`;
