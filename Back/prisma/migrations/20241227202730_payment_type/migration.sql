-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('Money', 'Points');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "paymentType" "PaymentType" NOT NULL DEFAULT 'Money';
