/*
  Warnings:

  - Made the column `avatar` on table `student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `student` MODIFY `avatar` VARCHAR(191) NOT NULL;
