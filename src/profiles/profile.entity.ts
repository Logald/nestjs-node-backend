import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'profile' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  type: string;
}
