/*
  Warnings:

  - Added the required column `location` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "startDate" TEXT NOT NULL;
