import { AppDataSource } from '../datasource';
import { CabinLayout } from '../entity/cabin-layout';
import { Row } from '../entity/row';
import { SeatType } from '../entity/seat-type';

const cabinLayoutData = {
  id: 'C3005',
  width: 310,
  length: 4000,
  rows: [
    {
      id: 1,
      aisle: 106,
      extraSpace: 0,
      seatType: 'BIZ-ADV',
    },
    {
      id: 2,
      aisle: 106,
      extraSpace: 0,
      seatType: 'BIZ-ADV',
    },
    {
      id: 3,
      aisle: 106,
      extraSpace: 0,
      seatType: 'BIZ-ADV',
    },
    {
      id: 4,
      aisle: 106,
      extraSpace: 0,
      seatType: 'BIZ-ADV',
    },
    {
      id: 5,
      aisle: 106,
      extraSpace: 0,
      seatType: 'BIZ-ADV',
    },
    {
      id: 6,
      aisle: 126,
      extraSpace: 10,
      seatType: 'ECON-CLSC',
    },
    {
      id: 7,
      aisle: 126,
      extraSpace: 10,
      seatType: 'ECON-CLSC',
    },
    {
      id: 8,
      aisle: 126,
      extraSpace: 0,
      seatType: 'ECON-CLSC',
    },
    {
      id: 9,
      aisle: 126,
      extraSpace: 0,
      seatType: 'ECON-CLSC',
    },
    {
      id: 10,
      aisle: 126,
      extraSpace: 0,
      seatType: 'ECON-CLSC',
    },
  ],
};

export const seedCabinLayout = async () => {
  await AppDataSource.createQueryBuilder()
    .delete()
    .from(Row)
    .where('1=1')
    .execute();

  await AppDataSource.createQueryBuilder()
    .delete()
    .from(CabinLayout)
    .where('1=1')
    .execute();

  const runner = AppDataSource.createQueryRunner('master');

  await runner.startTransaction();
  try {
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
      row.id = rowData.id;
      row.aisle = rowData.aisle;
      row.extraSpace = rowData.extraSpace;
      row.cabinLayout = cabinLayout;
      row.seat = seat;
      row.version = 1;

      await runner.manager
        .createQueryBuilder()
        .insert()
        .into(Row)
        .values(row)
        .execute();
    }

    await runner.commitTransaction();
  } catch (err) {
    await runner.rollbackTransaction();
  } finally {
    await runner.release();
  }
};
