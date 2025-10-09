// create-atividade.dto.ts
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAtividadeDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  status: 'pendente' | 'em_andamento' | 'concluida';

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  data: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  prazo: Date;

  @IsString()
  @IsNotEmpty()
  latitude: string;

  @IsString()
  @IsNotEmpty()
  longitude: string;

  @IsString()
  @IsNotEmpty()
  endereco: string;

  @IsNumber()
  @IsNotEmpty()
  usuarioId: number;

  @IsNumber()
  @IsNotEmpty()
  clienteId: number;
}
