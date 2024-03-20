import { AppDataSource } from '../../datasource';
import { SeatType } from '../seat-type';

export const seedSeatTypes = async () => {
  await AppDataSource.createQueryBuilder()
    .delete()
    .from(SeatType)
    .where('1=1')
    .execute();

  const seatType = new SeatType();
  seatType.seatTypeId = 'ECON-HRTG';
  seatType.seatType = 'Heritage Economy Non-Reclining';
  seatType.width = 43;
  seatType.height = 88;
  seatType.pitch = 70;
  seatType.weight = 12;
  seatType.productionDate = new Date(1980, 0);
  seatType.comfortLevel = 5;
  seatType.features = 'Wooden, non-reclining, minimal cushion';
  seatType.version = 1;
  await seatType.save();

  const seatType2 = new SeatType();
  seatType2.seatTypeId = 'ECON-CLSC';
  seatType2.seatType = 'Classic Economy Plus';
  seatType2.width = 46;
  seatType2.height = 92;
  seatType2.pitch = 78;
  seatType2.weight = 15;
  seatType2.productionDate = new Date(1990, 0);
  seatType2.comfortLevel = 35;
  seatType2.features = 'Basic padding, limited recline, extra legroom';
  seatType2.version = 1;
  await seatType2.save();
};
