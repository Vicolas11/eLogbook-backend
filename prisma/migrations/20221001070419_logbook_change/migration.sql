/*
  Warnings:

  - You are about to alter the column `label` on the `logbook` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("Logbook_label")`.

*/
-- DropForeignKey
ALTER TABLE `logbook` DROP FOREIGN KEY `Logbook_studentId_fkey`;

-- AlterTable
ALTER TABLE `logbook` MODIFY `label` ENUM('indigo', 'gray', 'green', 'blue', 'red') NOT NULL DEFAULT 'indigo',
    MODIFY `approved` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `studentId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Logbook` ADD CONSTRAINT `Logbook_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
