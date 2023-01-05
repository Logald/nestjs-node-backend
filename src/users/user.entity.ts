import { Person } from 'src/people/person.entity';
import { Profile } from 'src/profiles/profile.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  password: string;
  @Column({unique: true})
  personId: number;
  @ManyToOne(()=>Person)
  person: Person;
  @Column()
  profileId: number;
  @ManyToOne(()=>Profile)
  profile: Profile;
  @Column({type:'boolean', default: true})
  active: boolean;
}
