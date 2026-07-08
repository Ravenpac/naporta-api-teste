import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CriarItemPedidoDto } from './criar-item-pedido.dto';
import { StatusPedido } from '@prisma/client';

export class CriarPedidoDto {
  @IsString()
  @IsNotEmpty()
  numeroPedido!: string;

  @IsDateString()
  dataPrevisaoEntrega!: string;

  @IsString()
  clienteNome!: string;

  @IsString()
  clienteDocumento!: string;

  @IsString()
  enderecoEntrega!: string;

  @IsEnum(StatusPedido)
  status!: StatusPedido;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CriarItemPedidoDto)
  itens!: CriarItemPedidoDto[];
}
