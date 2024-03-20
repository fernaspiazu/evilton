import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { CabinLayout } from './cabin-layout';
import { Aircraft } from './aircraft';

@Entity()
export class FleetUnit extends BaseEntity {
  @PrimaryColumn()
  tailNumber: string;

  @Column()
  manufacturingDate: Date;

  @Column()
  purchaseDate: Date;

  @Column()
  nextMaintenanceDate: Date;

  @ManyToOne(() => Aircraft, (aircraft) => aircraft.fleetUnits)
  model: Aircraft;

  @ManyToOne(() => CabinLayout, (cabinLayout) => cabinLayout.fleetUnits)
  cabinLayout: CabinLayout;

  @Column()
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
