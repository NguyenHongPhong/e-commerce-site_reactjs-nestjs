/*
  Warnings:

  - You are about to alter the column `status_id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `userstatus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `userstatus` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `status_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `userstatus` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);
