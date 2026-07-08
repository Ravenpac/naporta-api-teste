/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('OrdersService', () => {
  let service: OrdersService;

  const prismaMock = {
    pedido: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);

    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um pedido', async () => {
    const pedidoMock = {
      id: '1',
      numeroPedido: 'PED-001',
      clienteNome: 'João Silva',
    };

    prismaMock.pedido.create.mockResolvedValue(pedidoMock);

    const result = await service.criarPedido({
      numeroPedido: 'PED-001',
      dataPrevisaoEntrega: new Date('2026-07-20') as unknown as string,
      clienteNome: 'João Silva',
      clienteDocumento: '123456789',
      enderecoEntrega: 'Rua A',
      status: 'PENDENTE',
      itens: [
        {
          descricao: 'Produto',
          preco: 100,
        },
      ],
    });

    expect(prismaMock.pedido.create).toHaveBeenCalled();

    expect(result).toEqual(pedidoMock);
  });

  it('deve listar pedidos não excluídos', async () => {
    const pedidosMock = [
      {
        id: '1',
        numeroPedido: 'PED-001',
      },
    ];

    prismaMock.pedido.findMany.mockResolvedValue(pedidosMock);

    const result = await service.listarPedidos({});

    expect(prismaMock.pedido.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          excluidoEm: null,
        },
      }),
    );

    expect(result).toEqual(pedidosMock);
  });

  it('deve atualizar um pedido existente', async () => {
    const pedidoMock = {
      id: '1',
      status: 'ENTREGUE',
    };

    prismaMock.pedido.findUnique.mockResolvedValue(pedidoMock);

    prismaMock.pedido.update.mockResolvedValue(pedidoMock);

    const result = await service.atualizarPedido('1', {
      status: 'ENTREGUE',
    });

    expect(prismaMock.pedido.update).toHaveBeenCalled();

    expect(result).toEqual(pedidoMock);
  });

  it('deve impedir atualização de pedido inexistente', async () => {
    prismaMock.pedido.findUnique.mockResolvedValue(null);

    await expect(
      service.atualizarPedido('999', {
        status: 'ENTREGUE',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('deve realizar exclusão lógica', async () => {
    const pedidoMock = {
      id: '1',
    };

    prismaMock.pedido.findUnique.mockResolvedValue(pedidoMock);

    prismaMock.pedido.update.mockResolvedValue({
      ...pedidoMock,
      excluidoEm: new Date(),
    });

    const result = await service.excluirPedido('1');

    expect(prismaMock.pedido.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          excluidoEm: expect.any(Date),
        },
      }),
    );

    expect(result.excluidoEm).toBeDefined();
  });
});
