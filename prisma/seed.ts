import { PrismaClient, StatusPedido } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.itemPedido.deleteMany();
  await prisma.pedido.deleteMany();
  await prisma.usuario.deleteMany();

  const senhaHash = await bcrypt.hash('admin123', 10);

  const usuario = await prisma.usuario.create({
    data: {
      email: 'admin@naporta.com',
      senha: senhaHash,
    },
  });

  console.log(`Usuário criado: ${usuario.email}`);

  await prisma.pedido.create({
    data: {
      numeroPedido: 'PED-001',

      dataPrevisaoEntrega: new Date('2026-07-15'),

      clienteNome: 'João Silva',
      clienteDocumento: '12345678900',

      enderecoEntrega: 'Rua A, 100',

      status: StatusPedido.PENDENTE,

      itens: {
        create: [
          {
            descricao: 'Notebook',
            preco: 3500,
          },
          {
            descricao: 'Mouse',
            preco: 120,
          },
        ],
      },
    },
  });

  await prisma.pedido.create({
    data: {
      numeroPedido: 'PED-002',

      dataPrevisaoEntrega: new Date('2026-07-20'),

      clienteNome: 'Maria Souza',
      clienteDocumento: '98765432100',

      enderecoEntrega: 'Rua B, 200',

      status: StatusPedido.EM_PROCESSAMENTO,

      itens: {
        create: [
          {
            descricao: 'Teclado',
            preco: 250,
          },
        ],
      },
    },
  });

  console.log('Pedidos criados!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
