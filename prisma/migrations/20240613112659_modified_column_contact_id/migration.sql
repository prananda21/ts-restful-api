/*
  Warnings:

  - You are about to drop the column `contactId` on the `addresses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `addresses` DROP FOREIGN KEY `addresses_contactId_fkey`;

-- AlterTable
ALTER TABLE `addresses` DROP COLUMN `contactId`;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_contact_id_fkey` FOREIGN KEY (`contact_id`) REFERENCES `contacts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
