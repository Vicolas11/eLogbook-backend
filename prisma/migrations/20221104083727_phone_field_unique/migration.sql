/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Coordinator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Organisation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[matricNo]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Supervisor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Coordinator_phone_key` ON `Coordinator`(`phone`);

-- CreateIndex
CREATE UNIQUE INDEX `Organisation_phone_key` ON `Organisation`(`phone`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_matricNo_key` ON `Student`(`matricNo`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_phone_key` ON `Student`(`phone`);

-- CreateIndex
CREATE UNIQUE INDEX `Supervisor_phone_key` ON `Supervisor`(`phone`);
