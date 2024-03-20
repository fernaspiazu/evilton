import { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import { AppDataSource } from './datasource';
import { seed } from './entity';

export const fastifyApp = async () => {
  const fastify: FastifyInstance = Fastify({
    logger: true,
  });

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  fastify.get('/seed', async (_req, resp) => {
    await seed();
    resp.status(200).send({ message: 'Executed seed' });
  });

  return fastify;
};
