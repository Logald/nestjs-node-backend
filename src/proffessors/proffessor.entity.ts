import { Person } from 'src/people/person.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'proffessor' })
export class Proffessor {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  personId: number;
  @OneToOne(() => Person, { onDelete: 'CASCADE' })
  person: Person;
  @Column({ default: true })
  active: boolean;
}
