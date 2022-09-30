/*
  Warnings:

  - Made the column `logo` on table `organisation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `organisation` MODIFY `logo` VARCHAR(191) NOT NULL;
