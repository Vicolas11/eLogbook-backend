/*
  Warnings:

  - A unique constraint covering the columns `[matricNo]` on the table `Eligible` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Eligible_matricNo_key` ON `Eligible`(`matricNo`);
