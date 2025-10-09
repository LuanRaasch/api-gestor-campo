/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  findAll(filtro: { tipo?: string; ativo?: boolean }): Promise<Usuario[]> {
    const where: any = {};

    if (filtro.tipo) {
      where.tipo = filtro.tipo;
    }

    if (filtro.ativo) {
      where.ativo = filtro.ativo;
    }

    return this.usuarioRepository.find({ where });
  }

  findOne(id: number): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { id } });
  }

  async update(id: number, usuario: UpdateUsuarioDto): Promise<Usuario | null> {
    await this.usuarioRepository.update(id, usuario);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }

  async criarUsuario(registerDto: RegisterDto): Promise<Usuario> {
    const usuario = this.usuarioRepository.create(registerDto);
    return this.usuarioRepository.save(usuario);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { email } });
  }
}
