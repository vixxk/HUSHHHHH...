/*
  Warnings:

  - You are about to drop the column `name` on the `Room` table. All the data in the column will be lost.
  - Added the required column `isPrivate` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomName` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Room" DROP COLUMN "name",
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL,
ADD COLUMN     "roomName" TEXT NOT NULL;
