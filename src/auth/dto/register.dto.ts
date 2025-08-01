import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  senha: string;

  @IsEnum(['gestor', 'tecnico'])
  tipo: 'gestor' | 'tecnico';
}
