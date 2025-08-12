import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({ default: 'tecnico' })
  tipo: 'gestor' | 'tecnico';

  @CreateDateColumn()
  criado_em: Date;

  @UpdateDateColumn()
  atualizado_em: Date;

  @BeforeInsert()
  async hashSenha() {
    this.senha = await bcrypt.hash(this.senha, 10);
  }

  async validarSenha(senha: string): Promise<boolean> {
    return bcrypt.compare(senha, this.senha);
  }
}
