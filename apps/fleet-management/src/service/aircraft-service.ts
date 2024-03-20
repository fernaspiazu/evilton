import { Aircraft } from '../repository';

export interface AircraftView {
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

  async save(aircraft: AircraftView): Promise<number> {
    const newAircraft = this.toAircraftEntity(aircraft);
    newAircraft.version = 1;
    const savedAircraft = await newAircraft.save();
    return savedAircraft.id;
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

  private toAircraftEntity(from: AircraftView): Aircraft {
    const aircraft = new Aircraft();
    aircraft.model = from.model;
    aircraft.manufacturer = from.manufacturer;
    aircraft.wingspan = from.wingspan;
    aircraft.cabinWidth = from.cabinWidth;
    aircraft.cabinHeight = from.cabinHeight;
    aircraft.cabinLength = from.cabinLength;
    aircraft.cargoCapacity = from.cargoCapacity;
    aircraft.range = from.range;
    aircraft.cruiseSpeed = from.cruiseSpeed;
    aircraft.engineType = from.engineType;
    aircraft.noiseLevel = from.noiseLevel;

    return aircraft;
  }
}
