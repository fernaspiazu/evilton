import { FastifyInstance } from 'fastify';
import Fastify from 'fastify';

const fastifyApp = async () => {
  const fastify: FastifyInstance = Fastify({
    logger: true,
  });

  fastify.get('/health', async (_req, resp) => {
    console.log('Healthy service');
    resp.status(200).send({ message: 'Healthy service' });
  });

  return fastify;
};

async function main() {
  const app = await fastifyApp();

  try {
    await app.listen({
      host: '0.0.0.0',
      port: 3000,
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

main();
