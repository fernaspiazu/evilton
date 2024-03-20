import { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import { seed } from './repository';
import {
  AircraftService,
  AircraftView,
  SeatTypeService,
  SeatTypeView,
} from './service';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';

export const fastifyApp = async (
  aircraftService: AircraftService,
  seatTypeService: SeatTypeService
) => {
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

  fastify.put(
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
      const body = req.body as AircraftView;
      const { id } = req.params as { id: number };
      const aircraftId = await aircraftService.persist(body, id);
      resp.status(200).send({ message: `Update aircraft`, id: aircraftId });
    }
  );

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

  // =====================================================

  fastify.get('/api/seat-types', async (_req, resp) => {
    const seatTypes = await seatTypeService.all();
    resp.status(200).send({ data: seatTypes });
  });

  fastify.get(
    '/api/seat-types/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
      },
    },
    async (req, resp) => {
      const { id } = req.params as { id: string };
      const seatType = await seatTypeService.findById(id);
      if (seatType) {
        resp.status(200).send({ data: seatType });
      } else {
        resp
          .status(404)
          .send({ message: `Seat type with id [${id}] not found` });
      }
    }
  );

  fastify.post('/api/seat-types', async (req, resp) => {
    const body = req.body as SeatTypeView;
    const seatTypeId = await seatTypeService.persist(body);
    resp.status(201).send({ message: `Saved new seat type`, id: seatTypeId });
  });

  fastify.put(
    '/api/seat-types/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
      },
    },
    async (req, resp) => {
      const body = req.body as SeatTypeView;
      const { id } = req.params as { id: string };
      const seatTypeId = await seatTypeService.persist(body, id);
      resp.status(200).send({ message: `Updated seat type`, id: seatTypeId });
    }
  );

  fastify.delete(
    '/api/seat-types/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
      },
    },
    async (req, resp) => {
      const { id } = req.params as { id: string };
      await seatTypeService.delete(id);
      resp.status(200).send({ message: 'Deleted seat type' });
    }
  );

  return fastify;
};
