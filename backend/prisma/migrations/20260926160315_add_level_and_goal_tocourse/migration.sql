-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "goals" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "level" TEXT NOT NULL DEFAULT 'Beginner';
