import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
export class Aircraft extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
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

  @Column()
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
