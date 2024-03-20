import { QueryRunner } from 'typeorm';
import { Aircraft } from '../entity/aircraft';
import { aircrafts } from './data/aircrafts';

export const seedAircrafts = async (runner: QueryRunner) => {
  await runner.manager
    .createQueryBuilder()
    .insert()
    .into(Aircraft)
    .values(aircrafts)
    .execute();
};
