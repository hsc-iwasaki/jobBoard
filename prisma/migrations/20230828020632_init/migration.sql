-- AlterTable
ALTER TABLE `Job` ADD COLUMN `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('Admin', 'JobSeeker', 'Recruiter') NOT NULL;
