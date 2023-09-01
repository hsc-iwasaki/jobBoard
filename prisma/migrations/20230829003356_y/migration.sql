-- DropForeignKey
ALTER TABLE `Company` DROP FOREIGN KEY `Company_recruiterId_fkey`;

-- DropForeignKey
ALTER TABLE `Job` DROP FOREIGN KEY `Job_companyId_fkey`;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_recruiterId_fkey` FOREIGN KEY (`recruiterId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
