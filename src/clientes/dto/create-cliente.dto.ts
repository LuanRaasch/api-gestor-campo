import { IsNotEmpty } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  cnpj: string;

  @IsNotEmpty()
  endereco: string;

  @IsNotEmpty()
  telefone: string;
}
