import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { FleetUnit } from './fleet-unit';

@Entity()
export class Aircraft extends BaseEntity {
  @PrimaryColumn()
  model: string;

  @Column()
  manufacturer: string;

  @Column('double precision')
  wingspan: number;

  @Column('double precision')
  cabinWidth: number;

  @Column('double precision')
  cabinHeight: number;

  @Column('double precision')
  cabinLength: number;

  @Column('double precision')
  cargoCapacity: number;

  @Column()
  range: number;

  @Column('double precision')
  cruiseSpeed: number;

  @Column()
  engineType: string;

  @Column()
  noiseLevel: string;

  @OneToMany(() => FleetUnit, (fleetUnit) => fleetUnit.model)
  fleetUnits: FleetUnit[];

  @Column()
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
