/*
  Warnings:

  - You are about to drop the column `mar_idFK` on the `activity_marker` table. All the data in the column will be lost.
  - You are about to drop the column `mar_idFK` on the `route` table. All the data in the column will be lost.
  - Added the required column `mar_idfk` to the `activity_marker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mar_idfk` to the `route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activity_marker" DROP COLUMN "mar_idFK",
ADD COLUMN     "mar_idfk" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "route" DROP COLUMN "mar_idFK",
ADD COLUMN     "mar_idfk" INTEGER NOT NULL;
