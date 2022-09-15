/*
  Warnings:

  - The values [Education & Training,Other] on the enum `Organisation_sector` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `organisation` MODIFY `sector` ENUM('Information Technology', 'Healthcare', 'Agriculture', 'Transportation', 'Energy', 'Commercial', 'Financial Services', 'Aviation', 'Construction', 'Manufacturing', 'Education And Training', 'Fashion', 'Logistics', 'Tourism', 'Telecommunication', 'Entertainment', 'Legal Services', 'Consultancy', 'Religion', 'Oil And Gas', 'Others') NOT NULL;
