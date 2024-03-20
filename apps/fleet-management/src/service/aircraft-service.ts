import { Aircraft } from '../repository';

export interface AircraftView {
  model: string | undefined;
  manufacturer: string | undefined;
  wingspan: number | undefined;
  cabinWidth: number | undefined;
  cabinHeight: number | undefined;
  cabinLength: number | undefined;
  cargoCapacity: number | undefined;
  range: number | undefined;
  cruiseSpeed: number | undefined;
  engineType: string | undefined;
  noiseLevel: string | undefined;
  version: number | undefined;
}

export class AircraftService {
  async all(): Promise<AircraftView[]> {
    return Aircraft.find().then((e) => e.map(this.toAircraftView));
  }

  async findByModel(model: string): Promise<AircraftView | null> {
    const aircraft = await Aircraft.findOneBy({ model: model });
    if (!aircraft) {
      return null;
    }
    return this.toAircraftView(aircraft);
  }

  async persist(
    aircraft: AircraftView,
    model: string | undefined = undefined,
  ): Promise<string> {
    let aircraftToPersist: Aircraft;
    if (model) {
      aircraftToPersist = await Aircraft.findOneBy({ model: model });
      aircraftToPersist.version += 1;
    } else {
      aircraftToPersist = new Aircraft();
      aircraftToPersist.version = 1;
    }

    this.toAircraftEntity(aircraft, aircraftToPersist);
    const persistedAircraft = await aircraftToPersist.save();
    return persistedAircraft.model;
  }

  async delete(model: string): Promise<void> {
    const result = await Aircraft.delete(model);
    console.log('rows affected:', result.affected);
  }

  private toAircraftView(from: Aircraft): AircraftView {
    return {
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
