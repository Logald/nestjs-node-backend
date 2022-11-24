import { Matter } from 'src/matters/matter.entity';
import { Proffessor } from 'src/proffessors/proffessor.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'speciality' })
export class Speciality {
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
