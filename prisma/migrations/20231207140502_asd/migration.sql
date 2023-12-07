/*
  Warnings:

  - Changed the type of `product_guarantee` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "product_guarantee",
ADD COLUMN     "product_guarantee" "GARANTIA" NOT NULL;
