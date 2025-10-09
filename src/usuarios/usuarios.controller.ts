import { Controller, Get, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
// eslint-disable-next-line prettier/prettier
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  findAll(@Query('tipo') tipo?: string, @Query('ativo') ativo?: boolean): Promise<Usuario[]> {
    return this.usuariosService.findAll({ tipo, ativo });
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Usuario | null> {
    return this.usuariosService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() usuario: UpdateUsuarioDto): Promise<Usuario | null> {
    return this.usuariosService.update(id, usuario);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usuariosService.remove(id);
  }
}
