import { Module } from '@nestjs/common';
import { AtividadesService } from './atividades.service';
import { AtividadesController } from './atividades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Atividade } from './entities/atividade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Atividade])],
  providers: [AtividadesService],
  controllers: [AtividadesController],
})
// eslint-disable-next-line prettier/prettier
export class AtividadesModule {}
