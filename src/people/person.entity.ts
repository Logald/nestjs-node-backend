import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'person' })
export class Person {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ type: 'varchar' })
    name: string

  @Column({ type: 'varchar' })
    lastname: string

  @Column({ unique: true })
    ci: number
}
