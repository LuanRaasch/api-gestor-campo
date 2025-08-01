import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async criarUsuario(registerDto: RegisterDto): Promise<Usuario> {
    const usuario = this.usuarioRepository.create(registerDto);
    return this.usuarioRepository.save(usuario);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { email } });
  }
}
