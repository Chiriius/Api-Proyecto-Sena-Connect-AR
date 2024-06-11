/*
  Warnings:

  - You are about to drop the column `rout_marker_fk` on the `route` table. All the data in the column will be lost.
  - Added the required column `mar_idFK` to the `route` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "route" DROP CONSTRAINT "route_rout_marker_fk_fkey";

-- AlterTable
ALTER TABLE "route" DROP COLUMN "rout_marker_fk",
ADD COLUMN     "mar_idFK" INTEGER NOT NULL,
ALTER COLUMN "rout_image" DROP NOT NULL;

-- CreateTable
CREATE TABLE "activity_marker" (
    "act_id" SERIAL NOT NULL,
    "mar_idFK" INTEGER NOT NULL,
    "scan_date" TIMESTAMP(3),
    "count" INTEGER NOT NULL,

    CONSTRAINT "activity_marker_pkey" PRIMARY KEY ("act_id")
);
