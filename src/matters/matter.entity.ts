import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('matter')
export class Matter {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', unique: true })
  name: string;
  @Column({ type: 'varchar' })
  description: string;
}
