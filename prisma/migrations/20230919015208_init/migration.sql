/*
  Warnings:

  - Made the column `region` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Job` MODIFY `region` ENUM('Ichihara', 'Chiharadai', 'Goi', 'Tatsumidai', 'Kokubunjidai', 'Anesaki', 'Shizu', 'Sanwa', 'Yusyu', 'Nansou', 'Kamo') NOT NULL;
