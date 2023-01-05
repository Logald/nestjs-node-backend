import { Gmp } from 'src/gmps/gmp.entity'
import { Turn } from 'src/turns/turn.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'absence' })
export class Absence {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    gmpId: number

  @ManyToOne(() => Gmp, { onDelete: 'CASCADE' })
    gmp: Gmp

  @Column()
    turnId: number

  @ManyToOne(() => Turn, { onDelete: 'CASCADE' })
    turn: Turn

  @Column({ type: 'datetime' })
    startDate: Date

  @Column({ type: 'datetime' })
    endDate: Date

  @Column({ type: 'boolean', default: true })
    active: boolean
}
