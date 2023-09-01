/*
  Warnings:

  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthday` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `graduation` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ruby` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spouse` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tel` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `birthday` VARCHAR(191) NOT NULL,
    ADD COLUMN `gender` VARCHAR(191) NOT NULL,
    ADD COLUMN `graduation` VARCHAR(191) NOT NULL,
    ADD COLUMN `ruby` VARCHAR(191) NOT NULL,
    ADD COLUMN `spouse` BOOLEAN NOT NULL,
    ADD COLUMN `tel` VARCHAR(191) NOT NULL;
