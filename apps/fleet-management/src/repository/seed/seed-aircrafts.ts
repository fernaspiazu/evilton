import { AppDataSource } from '../datasource';
import { Aircraft } from '../entity/aircraft';

export const seedAircrafts = async () => {
  await AppDataSource.createQueryBuilder()
    .delete()
    .from(Aircraft)
    .where('1=1')
    .execute();

  const aircraft = new Aircraft();
  aircraft.model = '737-300';
  aircraft.manufacturer = 'Boeing';
  aircraft.wingspan = 28.9;
  aircraft.cabinWidth = 3.54;
  aircraft.cabinHeight = 2.2;
  aircraft.cabinLength = 24.13;
  aircraft.cargoCapacity = 27.5;
  aircraft.range = 4444;
  aircraft.cruiseSpeed = 0.785;
  aircraft.engineType = 'CFM56-3 Series';
  aircraft.noiseLevel = '65-70';
  aircraft.version = 1;
  await aircraft.save();

  const aircraft2 = new Aircraft();
  aircraft2.model = '757-200';
  aircraft2.manufacturer = 'Boeing';
  aircraft2.wingspan = 38.05;
  aircraft2.cabinWidth = 3.54;
  aircraft2.cabinHeight = 2.13;
  aircraft2.cabinLength = 43.21;
  aircraft2.cargoCapacity = 43.4;
  aircraft2.range = 7222;
  aircraft2.cruiseSpeed = 0.8;
  aircraft2.engineType = 'RB211';
  aircraft2.noiseLevel = '65-72';
  aircraft2.version = 1;
  await aircraft2.save();
};
