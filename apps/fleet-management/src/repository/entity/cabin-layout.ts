import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Row } from '..';
import { FleetUnit } from './fleet-unit';

@Entity()
export class CabinLayout extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  width: number;

  @Column()
  length: number;

  @OneToMany(() => Row, (row) => row.cabinLayout, { lazy: true })
  rows: Row[];

  @OneToMany(() => FleetUnit, (fleetUnit) => fleetUnit.model)
  fleetUnits: FleetUnit[];

  @Column()
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
