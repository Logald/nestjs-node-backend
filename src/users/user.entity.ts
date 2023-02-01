import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Person } from 'src/people/person.entity';
import { Profile } from 'src/profiles/profile.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  // @Field()
  password: string;

  @Column({ unique: true })
  @Field(() => Int)
  personId: number;

  @ManyToOne(() => Person)
  @Field(() => Person)
  person: Person;

  @Column()
  @Field(() => Int)
  profileId: number;

  @ManyToOne(() => Profile)
  @Field(() => Profile)
  profile: Profile;

  @Column({ type: 'boolean', default: true })
  @Field({ defaultValue: true })
  active: boolean;
}
