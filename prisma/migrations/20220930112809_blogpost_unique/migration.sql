/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `BlogPost` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `BlogPost_title_key` ON `BlogPost`(`title`);
