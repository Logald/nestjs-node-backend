import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'absence' })
export class Absence {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  gmpId: number;
  @Column()
  turnId: number;
  @Column({ type: 'datetime' })
  startDate: Date;
  @Column({ type: 'datetime' })
  endDate: Date;
  @Column({ type: 'boolean', default: true })
  active: boolean;
}
