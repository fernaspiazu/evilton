import { fastifyApp } from './api';

async function main() {
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
