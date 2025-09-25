import { IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateUsuarioDto {
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  tipo: 'gestor' | 'tecnico';

  @IsNotEmpty()
  ativo: boolean;
}
