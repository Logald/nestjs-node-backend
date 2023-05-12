import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'matter' })
@ObjectType()
export class Matter {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
    id: number;

  @Column({ type: 'varchar', unique: true })
  @Field()
    code: string;

  @Column({ type: 'varchar' })
  @Field()
    name: string;

  @Column({ type: 'varchar', nullable: true })
  @Field({ nullable: true })
    description: string;
}
