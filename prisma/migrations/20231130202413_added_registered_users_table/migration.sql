-- AlterEnum
ALTER TYPE "ROLE" ADD VALUE 'DEV';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'ADMIN';

-- CreateTable
CREATE TABLE "RegisteredUsers" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "ROLE" NOT NULL DEFAULT 'ADMIN',

    CONSTRAINT "RegisteredUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RegisteredUsers_email_key" ON "RegisteredUsers"("email");
