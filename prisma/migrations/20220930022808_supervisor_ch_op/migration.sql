-- DropForeignKey
ALTER TABLE `supervisor` DROP FOREIGN KEY `Supervisor_coordinatorId_fkey`;

-- AlterTable
ALTER TABLE `supervisor` MODIFY `coordinatorId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Supervisor` ADD CONSTRAINT `Supervisor_coordinatorId_fkey` FOREIGN KEY (`coordinatorId`) REFERENCES `Coordinator`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
