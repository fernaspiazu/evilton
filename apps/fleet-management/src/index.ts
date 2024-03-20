import { fastifyApp } from './api';
import { AppDataSource } from './repository';

async function main() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const api = await fastifyApp();

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
