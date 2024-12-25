/*
  Warnings:

  - You are about to drop the column `couponId` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `price` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_couponId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "couponId",
ADD COLUMN     "coupon" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
