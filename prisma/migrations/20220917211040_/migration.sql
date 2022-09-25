-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_coordinatorId_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_organisationId_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_supervisorId_fkey`;

-- AlterTable
ALTER TABLE `student` MODIFY `supervisorId` VARCHAR(191) NULL,
    MODIFY `coordinatorId` VARCHAR(191) NULL,
    MODIFY `organisationId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_supervisorId_fkey` FOREIGN KEY (`supervisorId`) REFERENCES `Supervisor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_coordinatorId_fkey` FOREIGN KEY (`coordinatorId`) REFERENCES `Coordinator`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_organisationId_fkey` FOREIGN KEY (`organisationId`) REFERENCES `Organisation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
