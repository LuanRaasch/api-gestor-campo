import { IsNotEmpty } from 'class-validator';

export class UpdateClienteDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  cnpj: string;

  @IsNotEmpty()
  endereco: string;

  @IsNotEmpty()
  telefone: string;

  @IsNotEmpty()
  ativo: boolean;
}
