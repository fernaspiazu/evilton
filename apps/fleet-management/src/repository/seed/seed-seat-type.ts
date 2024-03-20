import { AppDataSource } from '../datasource';
import { SeatType } from '../entity/seat-type';

export const seedSeatTypes = async () => {
  await AppDataSource.createQueryBuilder()
    .delete()
    .from(SeatType)
    .where('1=1')
    .execute();

  await AppDataSource.createQueryBuilder()
    .insert()
    .into(SeatType)
    .values([
      {
        seatTypeId: 'ECON-HRTG',
        seatType: 'Heritage Economy Non-Reclining',
        width: 43,
        height: 88,
        pitch: 70,
        weight: 12,
        productionDate: new Date(1980, 0),
        comfortLevel: 5,
        features: 'Wooden, non-reclining, minimal cushion',
        version: 1,
      },
      {
        seatTypeId: 'ECON-CLSC',
        seatType: 'Classic Economy Plus',
        width: 46,
        height: 92,
        pitch: 78,
        weight: 15,
        productionDate: new Date(1990, 0),
        comfortLevel: 35,
        features: 'Basic padding, limited recline, extra legroom',
        version: 1,
      },
      {
        seatTypeId: 'BIZ-RETRO',
        seatType: 'Retro Business Class Basic',
        width: 49,
        height: 95,
        pitch: 89,
        weight: 22,
        productionDate: new Date(1998, 0),
        comfortLevel: 55,
        features: 'Basic reclining, added comfort features',
        version: 1,
      },
      {
        seatTypeId: 'ECON-MILN',
        seatType: 'Millennium Economy Reclining',
        width: 45,
        height: 90,
        pitch: 72,
        weight: 16,
        productionDate: new Date(2000, 0),
        comfortLevel: 25,
        features: 'Improved cushion, limited recline',
        version: 1,
      },
      {
        seatTypeId: 'ECON-CONTP',
        seatType: 'Contemporary Economy Plus',
        width: 47,
        height: 94,
        pitch: 82,
        weight: 18,
        productionDate: new Date(2010, 0),
        comfortLevel: 65,
        features: 'Enhanced padding, more legroom',
        version: 1,
      },
      {
        seatTypeId: 'BIZ-ADV',
        seatType: 'Advanced Business Class Basic',
        width: 51,
        height: 97,
        pitch: 120,
        weight: 28,
        productionDate: new Date(2005, 0),
        comfortLevel: 80,
        features: 'Premium reclining, superior comfort features',
        version: 1,
      },
      {
        seatTypeId: 'BIZ-NEODLX',
        seatType: 'Neo Business Class Deluxe',
        width: 53,
        height: 100,
        pitch: 210,
        weight: 32,
        productionDate: new Date(2015, 0),
        comfortLevel: 90,
        features: 'Lie-flat, luxury materials, maximum comfort',
        version: 1,
      },
      {
        seatTypeId: 'ECON-FUTR',
        seatType: 'Future Economy Non-Reclining',
        width: 44,
        height: 89,
        pitch: 73,
        weight: 14,
        productionDate: new Date(2018, 0),
        comfortLevel: 30,
        features: 'State-of-the-art materials, non-reclining',
        version: 1,
      },
      {
        seatTypeId: 'ECON-GENP',
        seatType: 'Generation Plus Economy',
        width: 48,
        height: 96,
        pitch: 84,
        weight: 20,
        productionDate: new Date(2020, 0),
        comfortLevel: 75,
        features: 'High comfort, adjustable legroom',
        version: 1,
      },
      {
        seatTypeId: 'BIZ-ULTRA',
        seatType: 'Ultra Business Class',
        width: 54,
        height: 101,
        pitch: 220,
        weight: 35,
        productionDate: new Date(2018, 0),
        comfortLevel: 100,
        features: 'Ultimate lie-flat, exclusive luxury features',
        version: 1,
      },
    ])
    .execute();
};
