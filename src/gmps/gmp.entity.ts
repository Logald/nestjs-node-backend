import { Group } from 'src/groups/group.entity';
import { Matter } from 'src/matters/matter.entity';
import { Proffessor } from 'src/proffessors/proffessor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'gmp' })
export class Gmp {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  matterId: number;
  @ManyToOne(() => Matter, { onDelete: 'CASCADE' })
  @JoinColumn()
  matter: Matter;
  @Column()
  groupId: number;
  @ManyToOne(() => Group, { onDelete: 'CASCADE' })
  @JoinColumn()
  group: Group;
  @Column({ nullable: true })
  proffessorId: number;
  @ManyToOne(() => Proffessor, { orphanedRowAction: 'nullify' })
  @JoinColumn()
  proffessor: Proffessor;
}
