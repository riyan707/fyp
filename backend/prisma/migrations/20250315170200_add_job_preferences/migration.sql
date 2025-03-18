/*
  Warnings:

  - Added the required column `committedHours` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `internshipType` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN     "committedHours" TEXT NOT NULL,
ADD COLUMN     "interestedRoles" TEXT[],
ADD COLUMN     "internshipType" TEXT NOT NULL,
ADD COLUMN     "preferredIndustries" TEXT[];
