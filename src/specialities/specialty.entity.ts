import { Matter } from 'src/matters/matter.entity';
import { Proffessor } from 'src/proffessors/proffessor.entity';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'specialty' })
@Index(['matterId', 'proffessorId'], { unique: true })
export class Specialty {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: false })
  matterId: number;
  @ManyToOne(() => Matter, { onDelete: 'CASCADE' })
  @JoinTable()
  matter: Matter;
  @Column({ unique: false })
  proffessorId: number;
  @ManyToOne(() => Proffessor, { onDelete: 'CASCADE' })
  @JoinTable()
  proffessor: Proffessor;
}
