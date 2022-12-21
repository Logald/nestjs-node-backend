import { Turn } from 'src/turns/turn.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'group' })
@Index(['grade', 'name'], { unique: true })
export class Group {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int' })
  grade: number;
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar', nullable: true })
  description: string;
  @Column()
  turnId: number;
  @ManyToOne(() => Turn, { onDelete: 'CASCADE' })
  turn: Turn;
  @Column({ default: true })
  active: boolean;
}
