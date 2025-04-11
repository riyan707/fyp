/*
  Warnings:

  - Added the required column `duration` to the `Internship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `internshipType` to the `Internship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Internship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferredIndustry` to the `Internship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillsRequired` to the `Internship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Internship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workPreference` to the `Internship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Internship" ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "internshipType" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "preferredIndustry" TEXT NOT NULL,
ADD COLUMN     "skillsRequired" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "workPreference" TEXT NOT NULL;
