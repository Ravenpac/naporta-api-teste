import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CriarItemPedidoDto {
  @IsString()
  descricao!: string;

  @IsNumber()
  @IsPositive()
  preco!: number;
}
