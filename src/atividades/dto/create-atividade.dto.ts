// create-atividade.dto.ts
import { IsDate, IsNotEmpty, IsNumber, IsString, isDate } from 'class-validator';

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

  @IsDate()
  @IsNotEmpty()
  data: Date;

  @IsNumber()
  @IsNotEmpty()
  usuarioId: number;

  @IsNumber()
  @IsNotEmpty()
  clienteId: number;
}
