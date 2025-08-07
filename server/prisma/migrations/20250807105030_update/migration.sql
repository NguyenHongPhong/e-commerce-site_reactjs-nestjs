/*
  Warnings:

  - You are about to drop the `userstatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `userstatus`;

-- CreateTable
CREATE TABLE `User_Status` (
    `id` INTEGER NOT NULL,
    `name` ENUM('active', 'inactive', 'pending', 'suspended', 'banned') NOT NULL DEFAULT 'active',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
