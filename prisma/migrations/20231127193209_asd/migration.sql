/*
  Warnings:

  - You are about to drop the column `cantidad` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `categoria` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `condicion` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `detalles` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `envio` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imagen_producto` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `precio` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `ubicacion` on the `Product` table. All the data in the column will be lost.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_condition` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_details` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_location` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_name` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_quantity` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_shipping` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "cantidad",
DROP COLUMN "categoria",
DROP COLUMN "condicion",
DROP COLUMN "descripcion",
DROP COLUMN "detalles",
DROP COLUMN "envio",
DROP COLUMN "imagen_producto",
DROP COLUMN "nombre",
DROP COLUMN "precio",
DROP COLUMN "ubicacion",
ADD COLUMN     "category" "CATEGORIA" NOT NULL,
ADD COLUMN     "product_condition" TEXT NOT NULL,
ADD COLUMN     "product_description" TEXT NOT NULL,
ADD COLUMN     "product_details" TEXT NOT NULL,
ADD COLUMN     "product_location" TEXT NOT NULL,
ADD COLUMN     "product_name" TEXT NOT NULL,
ADD COLUMN     "product_price" INTEGER NOT NULL,
ADD COLUMN     "product_quantity" INTEGER NOT NULL,
ADD COLUMN     "product_shipping" TEXT NOT NULL;
