import { seedAircrafts } from './seed-aircrafts';
import { seedSeatTypes } from './seed-seat-type';

import { seedCabinLayout } from './seed-cabin-layout';

export const seed = async () => {
  await Promise.all([seedAircrafts(), seedSeatTypes()]);
  await seedCabinLayout();
};
