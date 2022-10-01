/*
  Warnings:

  - You are about to drop the `eligibility` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `eligibility`;

-- CreateTable
CREATE TABLE `Eligible` (
    `id` VARCHAR(191) NOT NULL,
    `institute` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `level` ENUM('ND1', 'NC2', '300', '400') NOT NULL,
    `supervisor` VARCHAR(191) NOT NULL,
    `matricNo` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
