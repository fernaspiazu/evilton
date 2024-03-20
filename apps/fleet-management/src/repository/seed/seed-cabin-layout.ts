import { QueryRunner } from 'typeorm';
import { CabinLayout } from '../entity/cabin-layout';
import { Row } from '../entity/row';
import { SeatType } from '../entity/seat-type';
import { cabinLayoutData } from './data/cabin-layout';

export const seedCabinLayout = async (runner: QueryRunner) => {
  const seats = await SeatType.find();

  const cabinLayout = new CabinLayout();
  cabinLayout.id = cabinLayoutData.id;
  cabinLayout.width = cabinLayoutData.width;
  cabinLayout.length = cabinLayoutData.length;
  cabinLayout.version = 1;

  await runner.manager
    .createQueryBuilder()
    .insert()
    .into(CabinLayout)
    .values(cabinLayout)
    .execute();

  for (const rowData of cabinLayoutData.rows) {
    const seat = seats.find((e) => e.seatTypeId === rowData.seatType);
    const row = new Row();
    row.rowNumber = rowData.rowNumber;
    row.aisle = rowData.aisle;
    row.extraSpace = rowData.extraSpace;
    row.usedColumns = rowData.usedColumns;
    row.cabinLayout = cabinLayout;
    row.seatType = seat;
    row.version = 1;

    await runner.manager
      .createQueryBuilder()
      .insert()
      .into(Row)
      .values(row)
      .execute();
  }
};
