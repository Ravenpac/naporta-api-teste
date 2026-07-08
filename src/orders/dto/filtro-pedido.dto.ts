import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { StatusPedido } from '@prisma/client';

export class FiltroPedidoDto {
  @IsOptional()
  @IsString()
  numeroPedido?: string;

  @IsOptional()
  @IsDateString()
  dataInicial?: string;

  @IsOptional()
  @IsDateString()
  dataFinal?: string;

  @IsOptional()
  @IsEnum(StatusPedido)
  status?: StatusPedido;
}
