-- CreateEnum
CREATE TYPE "CATEGORIA" AS ENUM ('LAVADORA', 'NEVERA', 'TELEFONO', 'COMPUTADORA', 'TELEVISOR', 'ESTUFA', 'ARTICULOPARAHOGAR');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "precio" INTEGER NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "envio" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "condicion" TEXT NOT NULL,
    "detalles" TEXT NOT NULL,
    "categoria" "CATEGORIA" NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
