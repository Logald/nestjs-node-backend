import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Turn } from 'src/turns/turn.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'group' })
@Index(['grade', 'name'], { unique: true })
@ObjectType()
export class Group {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  grade: number;

  @Column({ type: 'varchar' })
  @Field()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  @Field({ nullable: true })
  description: string;

  @Column()
  @Field(() => Int)
  turnId: number;

  @ManyToOne(() => Turn, { onDelete: 'CASCADE' })
  @Field(() => Turn)
  turn: Turn;

  @Column({ default: true })
  @Field({ defaultValue: true })
  active: boolean;
}
