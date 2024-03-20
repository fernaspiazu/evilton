import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { SeatType, CabinLayout } from '..';

@Entity()
export class Row extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rowNumber: number;

  @Column()
  aisle: number;

  @Column()
  extraSpace: number;

  @Column({ type: 'varchar', array: true, nullable: true })
  usedColumns: string[];

  @ManyToOne(() => SeatType, (seatType) => seatType.rows)
  seatType: SeatType;

  @ManyToOne(() => CabinLayout, (cabinLayout) => cabinLayout.rows)
  cabinLayout: CabinLayout;

  @Column()
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
