import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AtividadesService } from './atividades.service';
import { Atividade } from './entities/atividade.entity';
import { CreateAtividadeDto } from './dto/create-atividade.dto';

@Controller('atividades')
// eslint-disable-next-line prettier/prettier
export class AtividadesController {
  constructor(private readonly atividadesService: AtividadesService) {}

  @Get()
  findAll(): Promise<Atividade[]> {
    return this.atividadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Atividade | null> {
    return this.atividadesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateAtividadeDto): Promise<Atividade> {
    return this.atividadesService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() usuario: Partial<Atividade>): Promise<Atividade | null> {
    return this.atividadesService.update(id, usuario);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.atividadesService.remove(id);
  }
}
