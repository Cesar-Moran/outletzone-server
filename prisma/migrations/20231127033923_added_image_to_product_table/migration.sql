/*
  Warnings:

  - Added the required column `imagen_producto` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "imagen_producto" TEXT NOT NULL;
