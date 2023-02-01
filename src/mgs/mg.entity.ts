import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Group } from 'src/groups/group.entity';
import { Matter } from 'src/matters/matter.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'mg' })
@Index(['matterId', 'groupId'], { unique: true })
@ObjectType()
export class MG {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  matterId: number;

  @ManyToOne(() => Matter, { onDelete: 'CASCADE' })
  @JoinColumn()
  @Field(() => Matter)
  matter: Matter;

  @Column()
  @Field(() => Int)
  groupId: number;

  @ManyToOne(() => Group, { onDelete: 'CASCADE' })
  @JoinColumn()
  @Field(() => Group)
  group: Group;
}
