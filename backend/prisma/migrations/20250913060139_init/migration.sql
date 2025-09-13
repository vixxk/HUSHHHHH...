/*
  Warnings:

  - A unique constraint covering the columns `[roomCode]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomCode` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE "public".room_id_seq;
ALTER TABLE "public"."Room" ADD COLUMN     "roomCode" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('"public".room_id_seq');
ALTER SEQUENCE "public".room_id_seq OWNED BY "public"."Room"."id";

-- CreateIndex
CREATE UNIQUE INDEX "Room_roomCode_key" ON "public"."Room"("roomCode");
