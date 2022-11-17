import { Group } from 'src/groups/group.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'turn' })
export class Turn {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', unique: true })
  name: string;
  @OneToMany(() => Group, (group) => group.turnId)
  groups: Group[];
}
