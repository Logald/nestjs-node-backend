import { Group } from 'src/groups/group.entity'
import { Matter } from 'src/matters/matter.entity'
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'mg' })
@Index(['matterId', 'groupId'], { unique: true })
export class MG {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    matterId: number

  @ManyToOne(() => Matter, { onDelete: 'CASCADE' })
  @JoinColumn()
    matter: Matter

  @Column()
    groupId: number

  @ManyToOne(() => Group, { onDelete: 'CASCADE' })
  @JoinColumn()
    group: Group
}
