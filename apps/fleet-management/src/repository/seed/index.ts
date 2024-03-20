import { seedAircrafts } from './seed-aircrafts';
import { seedSeatTypes } from './seed-seat-type';

import { seedCabinLayout } from './seed-cabin-layout';
import { AppDataSource } from '../datasource';

export const seed = async () => {
  const queryRunner = AppDataSource.createQueryRunner('master');
  await queryRunner.startTransaction();
  try {
    await seedAircrafts(queryRunner);
    await seedSeatTypes(queryRunner);
    await seedCabinLayout(queryRunner);
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};
