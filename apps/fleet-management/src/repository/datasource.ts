import { DataSource } from 'typeorm';
import { Aircraft, SeatType, CabinLayout, Row, FleetUnit } from '.';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  logging: true,
  entities: [Aircraft, SeatType, Row, CabinLayout, FleetUnit],
  subscribers: [],
  migrations: [],
});
