import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Atividade } from './entities/atividade.entity';
import { Repository } from 'typeorm';
import { CreateAtividadeDto } from './dto/create-atividade.dto';

@Injectable()
// eslint-disable-next-line prettier/prettier
export class AtividadesService {
    constructor(
        @InjectRepository(Atividade)
        private readonly atividadeRepository: Repository<Atividade>,
    ) {}

    findAll(): Promise<Atividade[]> {
        return this.atividadeRepository.find();
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
        usuario: { id: dto.usuarioId } as any,
        cliente: { id: dto.clienteId } as any
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
}
