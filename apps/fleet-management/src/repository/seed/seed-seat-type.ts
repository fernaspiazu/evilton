import { QueryRunner } from 'typeorm';
import { SeatType } from '../entity/seat-type';
import { seatTypes } from './data/seat-types';

export const seedSeatTypes = async (runner: QueryRunner) => {
  await runner.manager
    .createQueryBuilder()
    .insert()
    .into(SeatType)
    .values(seatTypes)
    .execute();
};
