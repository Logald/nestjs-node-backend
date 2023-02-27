import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Gmp } from 'src/gmps/gmp.entity';
import { Turn } from 'src/turns/turn.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'absence' })
@ObjectType()
export class Absence {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  gmpId: number;

  @ManyToOne(() => Gmp, { onDelete: 'CASCADE' })
  @Field(() => Gmp)
  gmp: Gmp;

  @Column()
  @Field(() => Int)
  turnId: number;

  @ManyToOne(() => Turn, { onDelete: 'CASCADE' })
  @Field(() => Turn)
  turn: Turn;

  @Column({ type: 'datetime' })
  @Field(() => Date)
  startDate: Date;

  @Column({ type: 'datetime' })
  @Field(() => Date)
  endDate: Date;

  @Column({ nullable: true })
  @Field()
  reason: string;

  @Column({ type: 'boolean', default: true })
  @Field()
  active: boolean;
}
