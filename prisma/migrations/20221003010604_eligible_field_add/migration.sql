/*
  Warnings:

  - You are about to drop the column `supervisor` on the `eligible` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `eligible` DROP COLUMN `supervisor`,
    ADD COLUMN `coordinatorId` VARCHAR(191) NULL,
    ADD COLUMN `supervisorId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Eligible` ADD CONSTRAINT `Eligible_supervisorId_fkey` FOREIGN KEY (`supervisorId`) REFERENCES `Supervisor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Eligible` ADD CONSTRAINT `Eligible_coordinatorId_fkey` FOREIGN KEY (`coordinatorId`) REFERENCES `Coordinator`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
