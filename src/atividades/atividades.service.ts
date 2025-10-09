/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Atividade } from './entities/atividade.entity';
import { Repository, Between, Like } from 'typeorm';
import { CreateAtividadeDto } from './dto/create-atividade.dto';

@Injectable()
// eslint-disable-next-line prettier/prettier
export class AtividadesService {
  constructor(
    @InjectRepository(Atividade)
    private readonly atividadeRepository: Repository<Atividade>,
  ) {}

  findAll(filtros: {
    status?: string;
    titulo?: string;
    dataInicio?: string;
    dataFim?: string;
  }): Promise<Atividade[]> {
    const where: any = {};

    if (filtros.status) {
      where.status = filtros.status;
    }

    if (filtros.titulo) {
      where.titulo = Like(`%${filtros.titulo}%`);
    }

    if (filtros.dataInicio && filtros.dataFim) {
      where.data = Between(new Date(filtros.dataInicio), new Date(filtros.dataFim));
    }

    return this.atividadeRepository.find({ where, relations: ['usuario', 'cliente'] });
  }

  findOne(id: number): Promise<Atividade | null> {
    return this.atividadeRepository.findOne({ where: { id } });
  }

  async create(dto: CreateAtividadeDto): Promise<Atividade> {
    const atividade = this.atividadeRepository.create({
      titulo: dto.titulo,
      descricao: dto.descricao,
      status: dto.status,
      data: dto.data,
      prazo: dto.prazo,
      latitude: dto.latitude,
      longitude: dto.longitude,
      endereco: dto.endereco,
      usuario: { id: dto.usuarioId } as any,
      cliente: { id: dto.clienteId } as any,
    });

    return this.atividadeRepository.save(atividade);
  }

  async update(id: number, atividade: Partial<Atividade>): Promise<Atividade | null> {
    await this.atividadeRepository.update(id, atividade);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.atividadeRepository.delete(id);
    return undefined;
  }

  async countByStatusWithFilter(dataInicio?: string, dataFim?: string) {
    const query = this.atividadeRepository
      .createQueryBuilder('atividade')
      .select('atividade.status', 'status')
      .addSelect('COUNT(*)', 'total')
      .groupBy('atividade.status');

    if (dataInicio && dataFim) {
      query.andWhere('atividade.dataInicio BETWEEN :inicio AND :fim', {
        inicio: dataInicio,
        fim: dataFim,
      });
    }

    return query.getRawMany();
  }

  async resumoPorTecnico() {
    const raw = await this.atividadeRepository
      .createQueryBuilder('atividade')
      .leftJoin('atividade.usuario', 'usuario')
      .select('usuario.id', 'id')
      .addSelect('usuario.nome', 'nome')
      .addSelect(`COUNT(CASE WHEN atividade.status = 'concluido' THEN 1 END)`, 'concluidas')
      .addSelect(`COUNT(CASE WHEN atividade.status = 'pendente' THEN 1 END)`, 'pendentes')
      .addSelect(`COUNT(CASE WHEN atividade.status = 'em_andamento' THEN 1 END)`, 'em_andamento')
      .groupBy('usuario.id')
      .getRawMany();

    // converte os valores para inteiro
    return raw.map((item) => ({
      id: item.id,
      nome: item.nome,
      concluidas: parseInt(item.concluidas, 10),
      pendentes: parseInt(item.pendentes, 10),
      em_andamento: parseInt(item.em_andamento, 10),
    }));
  }
}
