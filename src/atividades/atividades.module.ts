import { Module } from '@nestjs/common';
import { AtividadesService } from './atividades.service';
import { AtividadesController } from './atividades.controller';

@Module({
  providers: [AtividadesService],
  controllers: [AtividadesController],
})
// eslint-disable-next-line prettier/prettier
export class AtividadesModule {}
