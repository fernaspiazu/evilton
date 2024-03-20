import { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import { seed } from './entity';

export const fastifyApp = async () => {
  const fastify: FastifyInstance = Fastify({
    logger: true,
  });

  fastify.get('/seed', async (_req, resp) => {
    await seed();
    resp.status(200).send({ message: 'Executed seed' });
  });

  return fastify;
};
