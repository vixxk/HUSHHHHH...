/*
  Warnings:

  - Added the required column `admin` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastActivity` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Room" ADD COLUMN     "admin" INTEGER NOT NULL,
ADD COLUMN     "lastActivity" TIMESTAMP(3) NOT NULL;
