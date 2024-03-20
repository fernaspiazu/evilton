import { DataSource } from 'typeorm';
import { Aircraft } from '.';
import { SeatType } from './entity/seat-type';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  logging: true,
  entities: [Aircraft, SeatType],
  subscribers: [],
  migrations: [],
});
