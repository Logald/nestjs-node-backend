import { MG } from 'src/mgs/mg.entity'
import { Proffessor } from 'src/proffessors/proffessor.entity'
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'gmp' })
@Index(['mgId', 'proffessorId'], { unique: true })
export class Gmp {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    mgId: number

  @ManyToOne(() => MG, { onDelete: 'CASCADE' })
  @JoinColumn()
    mg: MG

  @Column()
    proffessorId: number

  @ManyToOne(() => Proffessor, { orphanedRowAction: 'nullify' })
  @JoinColumn()
    proffessor: Proffessor

  @Column({ type: 'boolean', default: true })
    active: boolean
}
