/*
  Warnings:

  - You are about to drop the column `timeStimate` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "timeStimate",
ADD COLUMN     "timeEstimate" INTEGER;
