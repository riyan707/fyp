/*
  Warnings:

  - Added the required column `softSkill` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `softSkillDescription` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workPreference` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN     "softSkill" TEXT NOT NULL,
ADD COLUMN     "softSkillDescription" TEXT NOT NULL,
ADD COLUMN     "workPreference" TEXT NOT NULL;
