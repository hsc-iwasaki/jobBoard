-- AlterTable
ALTER TABLE `Job` ADD COLUMN `finish_time` DATETIME(3) NULL,
    ADD COLUMN `location_detail` VARCHAR(191) NULL,
    ADD COLUMN `salary_detail` VARCHAR(191) NULL,
    ADD COLUMN `start_time` DATETIME(3) NULL,
    ADD COLUMN `vacation` VARCHAR(191) NULL,
    ADD COLUMN `welfare` VARCHAR(191) NULL,
    ADD COLUMN `working_hours_detail` VARCHAR(191) NULL;
