/*
  Warnings:

  - Added the required column `industry` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Job` ADD COLUMN `industry` ENUM('Service', 'Construction', 'hairSalon', 'Restaurant') NOT NULL,
    ADD COLUMN `region` ENUM('Ichihara', 'Chiharadai', 'Goi', 'Tatsumidai', 'Kokubunjidai', 'anesaki', 'shizu', 'sanwa', 'yusyu', 'nansou', 'kamo') NULL;
