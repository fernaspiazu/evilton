import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { SeatType, CabinLayout } from '..';

@Entity()
export class Row extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  aisle: number;

  @Column()
  extraSpace: number;

  @ManyToOne(() => SeatType, (seatType) => seatType.rows)
  seat: SeatType;

  @ManyToOne(() => CabinLayout, (cabinLayout) => cabinLayout.rows)
  cabinLayout: CabinLayout;

  @Column()
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
