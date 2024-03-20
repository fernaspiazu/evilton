import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Row } from './row';

@Entity()
export class SeatType extends BaseEntity {
  @PrimaryColumn()
  seatTypeId: string;

  @Column()
  seatType: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  pitch: number;

  @Column()
  weight: number;

  @Column()
  productionDate: Date;

  @Column()
  comfortLevel: number;

  @Column()
  features: string;

  @OneToMany(() => Row, (row) => row.seatType, { lazy: true })
  rows: Row[];

  @Column()
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
