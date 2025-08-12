import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// cliente.entity.ts
@Entity('clientes')
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ unique: true })
    cnpj: string;

    @Column()
    endereco: string;

    @Column()
    telefone: string;

    @CreateDateColumn()
    criado_em: Date;

    @UpdateDateColumn()
    atualizado_em: Date;
}
