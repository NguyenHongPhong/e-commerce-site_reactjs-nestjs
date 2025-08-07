/*
  Warnings:

  - You are about to drop the column `accounType` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `user` table. All the data in the column will be lost.
  - Added the required column `accountType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `accounType`,
    DROP COLUMN `status`,
    ADD COLUMN `accountType` VARCHAR(191) NOT NULL;
