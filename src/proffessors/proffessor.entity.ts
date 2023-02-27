import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity, PrimaryGeneratedColumn
} from 'typeorm';

@ObjectType()
@Entity({ name: 'proffessor' })
export class Proffessor {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  lastname: string;

  @Column({ unique: true })
  @Field(() => Int)
  ci: number;

  @Column({ default: true })
  @Field()
  active: boolean;
}
