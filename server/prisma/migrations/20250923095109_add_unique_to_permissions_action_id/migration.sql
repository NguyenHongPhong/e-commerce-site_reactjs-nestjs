/*
  Warnings:

  - A unique constraint covering the columns `[action_id]` on the table `Permissions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Permissions_action_id_key` ON `Permissions`(`action_id`);
