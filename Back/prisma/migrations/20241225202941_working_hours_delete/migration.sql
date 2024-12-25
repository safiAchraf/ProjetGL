/*
  Warnings:

  - You are about to drop the column `workingDays` on the `Salon` table. All the data in the column will be lost.
  - You are about to drop the column `workingHours` on the `Salon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Salon" DROP COLUMN "workingDays",
DROP COLUMN "workingHours";
