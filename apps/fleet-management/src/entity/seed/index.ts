import { seedAircrafts } from './seed-aircrafts';
import { seedSeatTypes } from './seed-seat-type';

export const seed = async () => {
  Promise.all([seedAircrafts(), seedSeatTypes()]);
  await seedAircrafts();
};
