import { DataSource } from 'typeorm';
import { Aircraft } from './entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  logging: true,
  entities: [Aircraft],
  subscribers: [],
  migrations: [],
});
