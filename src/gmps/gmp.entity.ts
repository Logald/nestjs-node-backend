import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MG } from 'src/mgs/mg.entity';
import { Proffessor } from 'src/proffessors/proffessor.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'gmp' })
@Index(['mgId', 'proffessorId'], { unique: true })
@ObjectType()
export class Gmp {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  mgId: number;

  @ManyToOne(() => MG, { onDelete: 'CASCADE' })
  @JoinColumn()
  @Field(() => MG)
  mg: MG;

  @Column()
  @Field(() => Int)
  proffessorId: number;

  @ManyToOne(() => Proffessor, { orphanedRowAction: 'nullify' })
  @JoinColumn()
  @Field(() => Proffessor)
  proffessor: Proffessor;

  @Column({ type: 'boolean', default: true })
  @Field()
  active: boolean;
}
