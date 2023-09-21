-- AlterTable
ALTER TABLE `Company` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `Job` MODIFY `description` TEXT NOT NULL,
    MODIFY `location_detail` TEXT NULL,
    MODIFY `salary_detail` TEXT NULL,
    MODIFY `vacation` TEXT NULL,
    MODIFY `welfare` TEXT NULL,
    MODIFY `working_hours_detail` TEXT NULL;
