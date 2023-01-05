import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'matter' })
export class Matter {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ type: 'varchar', unique: true })
    name: string

  @Column({ type: 'varchar', nullable: true })
    description: string
}
