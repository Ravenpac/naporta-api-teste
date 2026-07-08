/*
  Warnings:

  - You are about to drop the `ItemPedido` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pedido` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ItemPedido" DROP CONSTRAINT "ItemPedido_pedidoId_fkey";

-- DropTable
DROP TABLE "public"."ItemPedido";

-- DropTable
DROP TABLE "public"."Pedido";

-- DropTable
DROP TABLE "public"."Usuario";

-- CreateTable
CREATE TABLE "public"."usuarios" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pedidos" (
    "id" TEXT NOT NULL,
    "numeroPedido" TEXT NOT NULL,
    "dataPrevisaoEntrega" TIMESTAMP(3) NOT NULL,
    "clienteNome" TEXT NOT NULL,
    "clienteDocumento" TEXT NOT NULL,
    "enderecoEntrega" TEXT NOT NULL,
    "status" "public"."StatusPedido" NOT NULL DEFAULT 'PENDENTE',
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "excluidoEm" TIMESTAMP(3),

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."itens_pedido" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "pedidoId" TEXT NOT NULL,

    CONSTRAINT "itens_pedido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "public"."usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pedidos_numeroPedido_key" ON "public"."pedidos"("numeroPedido");

-- AddForeignKey
ALTER TABLE "public"."itens_pedido" ADD CONSTRAINT "itens_pedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "public"."pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
