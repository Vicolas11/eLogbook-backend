/*
  Warnings:

  - Added the required column `title` to the `Coordinator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Supervisor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `coordinator` ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `supervisor` ADD COLUMN `title` VARCHAR(191) NOT NULL;
