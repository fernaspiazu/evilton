import { seedAircrafts } from './seed-aircrafts';

export const seed = async () => {
  await seedAircrafts();
};
