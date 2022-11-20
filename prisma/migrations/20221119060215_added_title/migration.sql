/*
  Warnings:

  - You are about to alter the column `title` on the `coordinator` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("Coordinator_title")`.
  - You are about to alter the column `title` on the `supervisor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("Supervisor_title")`.

*/
-- AlterTable
ALTER TABLE `coordinator` MODIFY `title` ENUM('Professor', 'Doctor', 'Mr', 'Mrs', 'Miss') NOT NULL;

-- AlterTable
ALTER TABLE `supervisor` MODIFY `title` ENUM('Professor', 'Doctor', 'Mr', 'Mrs', 'Miss') NOT NULL;
