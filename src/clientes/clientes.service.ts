/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  findAll(filtro: { ativo?: boolean }): Promise<Cliente[]> {
    const where: any = {};

    if (filtro.ativo) {
      where.ativo = filtro.ativo;
    }

    return this.clienteRepository.find({ where });
  }

  findOne(id: number): Promise<Cliente | null> {
    return this.clienteRepository.findOne({ where: { id } });
  }

  create(cliente: CreateClienteDto): Promise<Cliente> {
    return this.clienteRepository.save(cliente);
  }

  async update(id: number, cliente: UpdateClienteDto): Promise<Cliente | null> {
    await this.clienteRepository.update(id, cliente);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.clienteRepository.delete(id);
    return undefined;
  }
}
