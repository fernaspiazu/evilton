import { AppDataSource } from '../datasource';
import { CabinLayout } from '../entity/cabin-layout';
import { Row } from '../entity/row';

const cabinLayoutData = {
  id: 'C3005',
  width: 310,
  length: 4000,
  version: 1,
  rows: [
    {
      id: 1,
      aisle: 106,
      extraSpace: 0,
      version: 1,
    },
    {
      id: 2,
      aisle: 106,
      extraSpace: 0,
      version: 1,
    },
    {
      id: 3,
      aisle: 106,
      extraSpace: 0,
      version: 1,
    },
    {
      id: 4,
      aisle: 106,
      extraSpace: 0,
      version: 1,
    },

    {
      id: 5,
      aisle: 126,
      extraSpace: 10,
      version: 1,
    },
    {
      id: 6,
      aisle: 126,
      extraSpace: 10,
      version: 1,
    },
    {
      id: 7,
      aisle: 126,
      extraSpace: 0,
      version: 1,
    },
    {
      id: 8,
      aisle: 126,
      extraSpace: 0,
      version: 1,
    },
    {
      id: 9,
      aisle: 126,
      extraSpace: 0,
      version: 1,
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
    const cabinLayout = new CabinLayout();
    cabinLayout.id = cabinLayoutData.id;
    cabinLayout.width = cabinLayoutData.width;
    cabinLayout.length = cabinLayoutData.length;
    cabinLayout.version = cabinLayoutData.version;

    await runner.manager
      .createQueryBuilder()
      .insert()
      .into(CabinLayout)
      .values(cabinLayout)
      .execute();

    for (const rowData of cabinLayoutData.rows) {
      const row = new Row();
      row.id = rowData.id;
      row.aisle = rowData.aisle;
      row.extraSpace = rowData.extraSpace;
      row.version = rowData.version;
      row.cabinLayout = cabinLayout;

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
