/*
  Warnings:

  - A unique constraint covering the columns `[staffID]` on the table `Coordinator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[staffID]` on the table `Supervisor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Coordinator_staffID_key` ON `Coordinator`(`staffID`);

-- CreateIndex
CREATE UNIQUE INDEX `Supervisor_staffID_key` ON `Supervisor`(`staffID`);
