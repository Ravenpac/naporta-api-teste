import { PartialType } from '@nestjs/mapped-types';
import { CriarPedidoDto } from './criar-pedido.dto';

export class AtualizarPedidoDto extends PartialType(CriarPedidoDto) {}
