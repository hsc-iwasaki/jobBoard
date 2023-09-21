/*
  Warnings:

  - Made the column `finish_time` on table `Job` required. This step will fail if there are existing NULL values in that column.
  - Made the column `start_time` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Job` MODIFY `finish_time` VARCHAR(191) NOT NULL,
    MODIFY `start_time` VARCHAR(191) NOT NULL;
