/*
  Warnings:

  - You are about to drop the `SetLocation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `setId` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SetLocation" DROP CONSTRAINT "SetLocation_locationId_fkey";

-- DropForeignKey
ALTER TABLE "SetLocation" DROP CONSTRAINT "SetLocation_setId_fkey";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "setId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "SetLocation";

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
