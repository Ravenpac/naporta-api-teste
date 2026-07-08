import { Body, Controller, Post, Get, Query, Param, Patch, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CriarPedidoDto } from './dto/criar-pedido.dto';
import { FiltroPedidoDto } from './dto/filtro-pedido.dto';
import { AtualizarPedidoDto } from './dto/atualizar-pedido.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('pedidos')
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

  @Patch(':id')
  atualizarPedido(@Param('id') id: string, @Body() dto: AtualizarPedidoDto) {
    return this.ordersService.atualizarPedido(id, dto);
  }

  @Delete(':id')
  excluirPedido(@Param('id') id: string) {
    return this.ordersService.excluirPedido(id);
  }
}
