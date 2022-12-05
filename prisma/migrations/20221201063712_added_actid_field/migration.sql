/*
  Warnings:

  - A unique constraint covering the columns `[actId]` on the table `Logbook` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `actId` to the `Logbook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `logbook` ADD COLUMN `actId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Logbook_actId_key` ON `Logbook`(`actId`);
