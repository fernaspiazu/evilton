import { fastifyApp } from './api';
import { AppDataSource } from './repository';
import { AircraftService, SeatTypeService } from './service';

async function main() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const aircraftService = new AircraftService();
  const seatTypeService = new SeatTypeService();
  const api = await fastifyApp(aircraftService, seatTypeService);

  try {
    await api.listen({
      host: '0.0.0.0',
      port: 3000,
    });
  } catch (err) {
    api.log.error(err);
    process.exit(1);
  }
}

main();
