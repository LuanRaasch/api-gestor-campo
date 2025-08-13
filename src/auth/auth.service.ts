import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async registrar(registerDto: RegisterDto) {
    const usuario = await this.usuariosService.criarUsuario(registerDto);
    return this.gerarToken(usuario);
  }

  async login(loginDto: LoginDto) {
    const usuario = await this.usuariosService.buscarPorEmail(loginDto.email);

    if (!usuario) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const senhaValida = await usuario.validarSenha(loginDto.senha);

    if (!senhaValida) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    return this.gerarToken(usuario);
  }

  gerarToken(usuario: any) {
    const payload = {
      sub: usuario.id,
      email: usuario.email,
      tipo: usuario.tipo,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
