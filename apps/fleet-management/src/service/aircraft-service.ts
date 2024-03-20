import { Aircraft } from '../repository';

export interface AircraftView {
  id: number | undefined;
  model: string;
  manufacturer: string;
  wingspan: number;
  cabinWidth: number;
  cabinHeight: number;
  cabinLength: number;
  cargoCapacity: number;
  range: number;
  cruiseSpeed: number;
  engineType: string;
  noiseLevel: string;
  version: number;
}

export class AircraftService {
  async all(): Promise<AircraftView[]> {
    return Aircraft.find().then((e) => e.map(this.toAircraftView));
  }

  async findById(id: number): Promise<AircraftView | null> {
    const aircraft = await Aircraft.findOneBy({ id: id });
    if (!aircraft) {
      return null;
    }
    return this.toAircraftView(aircraft);
  }

  async persist(
    aircraft: AircraftView,
    id: number | undefined = undefined
  ): Promise<number> {
    let aircraftToPersist: Aircraft;
    if (id) {
      aircraftToPersist = await Aircraft.findOneBy({ id: id });
      aircraftToPersist.version += 1;
    } else {
      aircraftToPersist = new Aircraft();
      aircraftToPersist.version = 1;
    }

    this.toAircraftEntity(aircraft, aircraftToPersist);
    const persistedAircraft = await aircraftToPersist.save();
    return persistedAircraft.id;
  }

  async delete(id: number): Promise<void> {
    const result = await Aircraft.delete(id);
    console.log('rows affected:', result.affected);
  }

  private toAircraftView(from: Aircraft): AircraftView {
    return {
      id: from.id,
      model: from.model,
      manufacturer: from.manufacturer,
      wingspan: from.wingspan,
      cabinWidth: from.cabinWidth,
      cabinHeight: from.cabinHeight,
      cabinLength: from.cabinLength,
      cargoCapacity: from.cargoCapacity,
      range: from.range,
      cruiseSpeed: from.cruiseSpeed,
      engineType: from.engineType,
      noiseLevel: from.noiseLevel,
      version: from.version,
    };
  }

  private toAircraftEntity(from: AircraftView, to: Aircraft): void {
    to.model = from.model ?? to.model;
    to.manufacturer = from.manufacturer ?? to.manufacturer;
    to.wingspan = from.wingspan ?? to.wingspan;
    to.cabinWidth = from.cabinWidth ?? to.cabinWidth;
    to.cabinHeight = from.cabinHeight ?? to.cabinHeight;
    to.cabinLength = from.cabinLength ?? to.cabinLength;
    to.cargoCapacity = from.cargoCapacity ?? to.cargoCapacity;
    to.range = from.range ?? to.range;
    to.cruiseSpeed = from.cruiseSpeed ?? to.cruiseSpeed;
    to.engineType = from.engineType ?? to.engineType;
    to.noiseLevel = from.noiseLevel ?? to.noiseLevel;
  }
}
