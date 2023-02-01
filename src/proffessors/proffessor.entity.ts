import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Person } from 'src/people/person.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@ObjectType()
@Entity({ name: 'proffessor' })
export class Proffessor {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ unique: true })
  @Field(() => Int)
  personId: number;

  @OneToOne(() => Person, { onDelete: 'CASCADE' })
  @JoinColumn()
  @Field(() => Person)
  person: Person;

  @Column({ default: true })
  @Field()
  active: boolean;
}
