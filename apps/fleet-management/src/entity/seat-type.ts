import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

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

  @Column()
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
