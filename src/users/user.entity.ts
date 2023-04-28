import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { userType } from './dtos/create_user.dto';

@Entity({ name: 'user' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
    id: number;

  @Column({ unique: true })
  @Field()
    name: string;

  @Column()
  // @Field()
    password: string;

  @Column({ default: 'Adscrito', enum: userType })
    type: string;

  @Column({ type: 'boolean', default: true })
  @Field({ defaultValue: true })
    active: boolean;
}
