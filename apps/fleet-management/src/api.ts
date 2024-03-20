import { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import { seed } from './repository';
import { AircraftService, AircraftView } from './service';

export const fastifyApp = async (aircraftService: AircraftService) => {
  const fastify: FastifyInstance = Fastify({
    logger: true,
  });

  fastify.get('/seed', async (_req, resp) => {
    await seed();
    resp.status(200).send({ message: 'Executed seed' });
  });

  fastify.get('/api/aircrafts', async (_req, resp) => {
    const aircrafts = await aircraftService.all();
    resp.status(200).send({ data: aircrafts });
  });

  fastify.post('/api/aircrafts', async (req, resp) => {
    const body = req.body;
    const aircraftId = await aircraftService.save(body as AircraftView);
    resp.status(201).send({ message: `Saved new aircraft`, id: aircraftId });
  });

  return fastify;
};
