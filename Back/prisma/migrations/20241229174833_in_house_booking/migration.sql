/*
  Warnings:

  - Added the required column `inHouse` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "inHouse" BOOLEAN NOT NULL;
