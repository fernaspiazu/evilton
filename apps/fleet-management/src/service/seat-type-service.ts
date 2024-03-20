import { SeatType } from '../repository';

export interface SeatTypeView {
  seatTypeId: string | undefined;
  seatType: string | undefined;
  width: number | undefined;
  height: number | undefined;
  pitch: number | undefined;
  weight: number | undefined;
  productionDate: Date | undefined;
  comfortLevel: number | undefined;
  features: string | undefined;
  version: number | undefined;
}

export class SeatTypeService {
  async all(): Promise<SeatTypeView[]> {
    return SeatType.find().then((e) => e.map(this.toSeatTypeView));
  }

  async findById(id: string): Promise<SeatTypeView | null> {
    const seatType = await SeatType.findOneBy({ seatTypeId: id });
    if (!seatType) {
      return null;
    }
    return this.toSeatTypeView(seatType);
  }

  async persist(
    seatType: SeatTypeView,
    id: string | undefined = undefined
  ): Promise<string> {
    let seatTypeToPersist: SeatType;
    if (id) {
      seatTypeToPersist = await SeatType.findOneBy({ seatTypeId: id });
      seatTypeToPersist.version += 1;
    } else {
      seatTypeToPersist = new SeatType();
      seatTypeToPersist.version = 1;
    }

    this.toSeatTypeEntity(seatType, seatTypeToPersist);
    const persistedAircraft = await seatTypeToPersist.save();
    return persistedAircraft.seatTypeId;
  }

  async delete(id: string): Promise<void> {
    const result = await SeatType.delete(id);
    console.log('rows affected:', result.affected);
  }

  private toSeatTypeView(from: SeatType): SeatTypeView {
    return {
      seatTypeId: from.seatTypeId,
      seatType: from.seatType,
      width: from.width,
      height: from.height,
      pitch: from.pitch,
      weight: from.weight,
      productionDate: from.productionDate,
      comfortLevel: from.comfortLevel,
      features: from.features,
      version: from.version,
    };
  }

  private toSeatTypeEntity(from: SeatTypeView, to: SeatType): void {
    to.seatTypeId = from.seatTypeId ?? to.seatTypeId;
    to.seatType = from.seatType ?? to.seatType;
    to.width = from.width ?? to.width;
    to.height = from.height ?? to.height;
    to.pitch = from.pitch ?? to.pitch;
    to.weight = from.weight ?? to.weight;
    to.productionDate = from.productionDate ?? to.productionDate;
    to.comfortLevel = from.comfortLevel ?? to.comfortLevel;
    to.features = from.features ?? to.features;
    to.version = from.version ?? to.version;
  }
}
