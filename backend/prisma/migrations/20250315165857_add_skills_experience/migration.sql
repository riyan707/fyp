/*
  Warnings:

  - Added the required column `learningNewSkills` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priorExperience` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN     "learningNewSkills" BOOLEAN NOT NULL,
ADD COLUMN     "priorExperience" BOOLEAN NOT NULL,
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "tools" TEXT[];
