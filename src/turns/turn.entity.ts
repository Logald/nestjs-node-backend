import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'turn' })
export class Turn {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', unique: true })
  name: string;
}
