import { MG } from 'src/mgs/mg.entity'
import { Proffessor } from 'src/proffessors/proffessor.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'gmp' })
export class Gmp {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    mgId: number

  @ManyToOne(() => MG, { onDelete: 'CASCADE' })
  @JoinColumn()
    mg: MG

  @Column({ nullable: true })
    proffessorId: number

  @ManyToOne(() => Proffessor, { orphanedRowAction: 'nullify' })
  @JoinColumn()
    proffessor: Proffessor

  @Column({ type: 'boolean', default: true })
    active: boolean
}
