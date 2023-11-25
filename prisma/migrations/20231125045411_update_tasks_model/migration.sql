/*
  Warnings:

  - You are about to drop the column `completed` on the `Task` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "completed",
ADD COLUMN     "status" "STATUS" NOT NULL DEFAULT 'TODO';
