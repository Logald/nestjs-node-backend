import { Turn } from 'src/turns/turn.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'group' })
export class Group {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', unique: true })
  name: string;
  @Column({ type: 'varchar', nullable: true })
  description: string;
  @Column()
  turnId: number;
  @ManyToOne(() => Turn, (turn) => turn.groups, { onDelete: 'CASCADE' })
  turn: Turn;
  @Column({ default: true })
  active: boolean;
}
