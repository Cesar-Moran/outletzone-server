/*
  Warnings:

  - Added the required column `product_image` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "product_image" TEXT NOT NULL;
