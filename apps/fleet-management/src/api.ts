import { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import { seed } from './repository';
import { AircraftService, AircraftView } from './service';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';

export const fastifyApp = async (aircraftService: AircraftService) => {
  const fastify: FastifyInstance = Fastify({
    logger: true,
  }).withTypeProvider<JsonSchemaToTsProvider>();

  fastify.get('/seed', async (_req, resp) => {
    await seed();
    resp.status(200).send({ message: 'Executed seed' });
  });

  fastify.get('/api/aircrafts', async (_req, resp) => {
    const aircrafts = await aircraftService.all();
    resp.status(200).send({ data: aircrafts });
  });

  fastify.get(
    '/api/aircrafts/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
        },
      },
    },
    async (req, resp) => {
      const { id } = req.params as { id: number };
      const aircraft = await aircraftService.findById(id);
      if (aircraft) {
        resp.status(200).send({ data: aircraft });
      } else {
        resp
          .status(404)
          .send({ message: `Aircraft with id [${id}] not found` });
      }
    }
  );

  fastify.post('/api/aircrafts', async (req, resp) => {
    const body = req.body as AircraftView;
    const aircraftId = await aircraftService.persist(body);
    resp.status(201).send({ message: `Saved new aircraft`, id: aircraftId });
  });

  fastify.put('/api/aircrafts/:id', async (req, resp) => {
    const body = req.body as AircraftView;
    const aircraftId = await aircraftService.persist(body);
    resp.status(200).send({ message: `Update aircraft`, id: aircraftId });
  });

  fastify.delete(
    '/api/aircrafts/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
        },
      },
    },
    async (req, resp) => {
      const { id } = req.params as { id: number };
      await aircraftService.delete(id);
      resp.status(200).send({ message: 'Deleted aircraft' });
    }
  );

  return fastify;
};
