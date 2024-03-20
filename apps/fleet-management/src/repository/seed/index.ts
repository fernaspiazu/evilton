import { seedAircrafts } from './seed-aircrafts';
import { seedSeatTypes } from './seed-seat-type';

import { seedCabinLayout } from './seed-cabin-layout';
import { AppDataSource } from '../datasource';

export const seed = async () => {
  await AppDataSource.synchronize(true);
  const queryRunner = AppDataSource.createQueryRunner('master');
  try {
    await queryRunner.startTransaction();
    await seedAircrafts(queryRunner);
    await seedSeatTypes(queryRunner);
    await queryRunner.commitTransaction();

    await queryRunner.startTransaction();
    await seedCabinLayout(queryRunner);
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};
