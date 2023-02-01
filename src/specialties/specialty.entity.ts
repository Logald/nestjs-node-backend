import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Matter } from 'src/matters/matter.entity';
import { Proffessor } from 'src/proffessors/proffessor.entity';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'specialty' })
@Index(['matterId', 'proffessorId'], { unique: true })
@ObjectType()
export class Specialty {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ unique: false })
  @Field(() => Int)
  matterId: number;

  @ManyToOne(() => Matter, { onDelete: 'CASCADE' })
  @JoinTable()
  @Field(() => Matter)
  matter: Matter;

  @Column({ unique: false })
  @Field(() => Int)
  proffessorId: number;

  @ManyToOne(() => Proffessor, { onDelete: 'CASCADE' })
  @JoinTable()
  @Field(() => Proffessor)
  proffessor: Proffessor;
}
