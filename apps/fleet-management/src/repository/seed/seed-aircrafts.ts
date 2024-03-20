import { AppDataSource } from '../datasource';
import { Aircraft } from '../entity/aircraft';

export const seedAircrafts = async () => {
  await AppDataSource.createQueryBuilder()
    .delete()
    .from(Aircraft)
    .where('1=1')
    .execute();

  await AppDataSource.createQueryBuilder()
    .insert()
    .into(Aircraft)
    .values([
      {
        model: '737-300',
        manufacturer: 'Boeing',
        wingspan: 28.9,
        cabinWidth: 3.54,
        cabinHeight: 2.2,
        cabinLength: 24.13,
        cargoCapacity: 27.5,
        range: 4444,
        cruiseSpeed: 0.785,
        engineType: 'CFM56-3 Series',
        noiseLevel: '65-70',
        version: 1,
      },
      {
        model: '757-200',
        manufacturer: 'Boeing',
        wingspan: 38.05,
        cabinWidth: 3.54,
        cabinHeight: 2.13,
        cabinLength: 43.21,
        cargoCapacity: 43.4,
        range: 7222,
        cruiseSpeed: 0.8,
        engineType: 'RB211',
        noiseLevel: '65-72',
        version: 1,
      },
      {
        model: '757-300',
        manufacturer: 'Boeing',
        wingspan: 38.05,
        cabinWidth: 3.54,
        cabinHeight: 2.13,
        cabinLength: 54.47,
        cargoCapacity: 52.5,
        range: 6295,
        cruiseSpeed: 0.8,
        engineType: 'RB211',
        noiseLevel: '65-72',
        version: 1,
      },
      {
        model: '747SP',
        manufacturer: 'Boeing',
        wingspan: 59.64,
        cabinWidth: 6.13,
        cabinHeight: 2.41,
        cabinLength: 56.31,
        cargoCapacity: 170.0,
        range: 12320,
        cruiseSpeed: 0.85,
        engineType: 'Pratt & Whitney JT9D',
        noiseLevel: '70-75',
        version: 1,
      },
      {
        model: 'A310',
        manufacturer: 'Airbus',
        wingspan: 43.9,
        cabinWidth: 5.28,
        cabinHeight: 2.54,
        cabinLength: 36.85,
        cargoCapacity: 150.0,
        range: 8050,
        cruiseSpeed: 0.8,
        engineType: 'GE CF6-80',
        noiseLevel: '65-70',
        version: 1,
      },
      {
        model: 'A300',
        manufacturer: 'Airbus',
        wingspan: 44.84,
        cabinWidth: 5.28,
        cabinHeight: 2.54,
        cabinLength: 40.7,
        cargoCapacity: 164.0,
        range: 7500,
        cruiseSpeed: 0.82,
        engineType: 'PW4000',
        noiseLevel: '65-70',
        version: 1,
      },
    ])
    .execute();
};
