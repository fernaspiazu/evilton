import { QueryRunner } from 'typeorm';
import { CabinLayout } from '../entity/cabin-layout';
import { Row } from '../entity/row';
import { SeatType } from '../entity/seat-type';
import { cabinLayoutData } from './data/cabin-layout';
import { FleetUnit } from '../entity/fleet-unit';
import { Aircraft } from '../entity/aircraft';

export const seedCabinLayout = async (runner: QueryRunner) => {
  const seats = await SeatType.find();
  const aircrafts = await Aircraft.find();

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

  for (const fleetUnitData of cabinLayoutData.fleetUnits) {
    const aircraft = aircrafts.find((e) => e.model === fleetUnitData.model);
    const fleetUnit = new FleetUnit();
    fleetUnit.tailNumber = fleetUnitData.tailNumber;
    fleetUnit.manufacturingDate = fleetUnitData.manufacturingDate;
    fleetUnit.purchaseDate = fleetUnitData.purchaseDate;
    fleetUnit.nextMaintenanceDate = fleetUnitData.nextMaintenanceDate;
    fleetUnit.cabinLayout = cabinLayout;
    fleetUnit.model = aircraft;
    fleetUnit.version = 1;

    await runner.manager
      .createQueryBuilder()
      .insert()
      .into(FleetUnit)
      .values(fleetUnit)
      .execute();
  }
};
