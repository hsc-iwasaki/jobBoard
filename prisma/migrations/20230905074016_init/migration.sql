/*
  Warnings:

  - Added the required column `name` to the `verificationtokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `verificationtokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `verificationtokens` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;
