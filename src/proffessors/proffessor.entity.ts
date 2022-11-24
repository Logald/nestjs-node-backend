import { Person } from 'src/people/person.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'proffessor' })
export class Proffessor {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  personId: number;
  @OneToOne(() => Person, { onDelete: 'CASCADE' })
  @JoinColumn()
  person: Person;
  @Column({ default: true })
  active: boolean;
}
