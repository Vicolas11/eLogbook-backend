-- AlterTable
ALTER TABLE `coordinator` MODIFY `avatar` VARCHAR(191) NULL DEFAULT 'https://i.pinimg.com/236x/00/70/d0/0070d05bc3d01aa3e04e5ebab7132985.jpg';

-- AlterTable
ALTER TABLE `student` MODIFY `avatar` VARCHAR(191) NOT NULL DEFAULT 'https://i.pinimg.com/236x/00/70/d0/0070d05bc3d01aa3e04e5ebab7132985.jpg';

-- AlterTable
ALTER TABLE `supervisor` MODIFY `avatar` VARCHAR(191) NULL DEFAULT 'https://i.pinimg.com/236x/00/70/d0/0070d05bc3d01aa3e04e5ebab7132985.jpg';
