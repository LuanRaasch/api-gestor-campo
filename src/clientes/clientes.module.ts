import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Cliente])],
  providers: [ClientesService],
  controllers: [ClientesController],
})
// eslint-disable-next-line prettier/prettier
export class ClientesModule {}
