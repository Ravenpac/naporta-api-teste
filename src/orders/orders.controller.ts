import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CriarPedidoDto } from './dto/criar-pedido.dto';
import { FiltroPedidoDto } from './dto/filtro-pedido.dto';

@Controller('pedidos')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  criar(@Body() dto: CriarPedidoDto) {
    return this.ordersService.criarPedido(dto);
  }

  @Get()
  listarPedidos(@Query() filtro: FiltroPedidoDto) {
    return this.ordersService.listarPedidos(filtro);
  }
}
