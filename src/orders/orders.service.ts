import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CriarPedidoDto } from './dto/criar-pedido.dto';
import { AtualizarPedidoDto } from './dto/atualizar-pedido.dto';
import { FiltroPedidoDto } from './dto/filtro-pedido.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async criarPedido(criarPedidoDto: CriarPedidoDto) {
    const {
      numeroPedido,
      dataPrevisaoEntrega,
      clienteNome,
      clienteDocumento,
      enderecoEntrega,
      status,
      itens,
    } = criarPedidoDto;

    return this.prisma.pedido.create({
      data: {
        numeroPedido,
        dataPrevisaoEntrega: new Date(dataPrevisaoEntrega),

        clienteNome,
        clienteDocumento,

        enderecoEntrega,

        status,

        itens: {
          create: itens,
        },
      },
      include: {
        itens: true,
      },
    });
  }

  async listarPedidos(filtro: FiltroPedidoDto) {
    const { numeroPedido, dataInicial, dataFinal, status } = filtro;

    return this.prisma.pedido.findMany({
      where: {
        excluidoEm: null,

        ...(numeroPedido && {
          numeroPedido: {
            contains: numeroPedido,
            mode: 'insensitive',
          },
        }),

        ...(status && {
          status,
        }),

        ...(dataInicial &&
          dataFinal && {
            dataPrevisaoEntrega: {
              gte: new Date(dataInicial),
              lte: new Date(dataFinal),
            },
          }),
      },

      include: {
        itens: true,
      },

      orderBy: {
        dataCriacao: 'desc',
      },
    });
  }

  async atualizarPedido(id: string, atualizarPedidoDto: AtualizarPedidoDto) {
    const pedido = await this.prisma.pedido.findUnique({
      where: {
        id,
      },
    });

    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }

    const { itens, ...pedidoData } = atualizarPedidoDto;

    return this.prisma.pedido.update({
      where: {
        id,
      },
      data: {
        ...pedidoData,
        ...(itens && {
          itens: {
            deleteMany: {},
            create: itens,
          },
        }),
      },
      include: {
        itens: true,
      },
    });
  }

  async excluirPedido(id: string) {
    const pedido = await this.prisma.pedido.findUnique({
      where: {
        id,
      },
    });

    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return this.prisma.pedido.update({
      where: {
        id,
      },
      data: {
        excluidoEm: new Date(),
      },
    });
  }
}
