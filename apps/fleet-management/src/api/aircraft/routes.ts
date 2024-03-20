import { RouteOptions } from 'fastify';
import { AircraftService, AircraftView } from '../../service';

export type AircraftRoute = (s: AircraftService) => RouteOptions;

export const findOneAircraft: AircraftRoute = (aircraftService) => ({
  method: 'GET',
  url: '/api/aircrafts/:id',
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
    },
  },
  handler: async function (req, resp) {
    const { id } = req.params as { id: number };
    const aircraft = await aircraftService.findById(id);
    if (aircraft) {
      resp.status(200).send({ data: aircraft });
    } else {
      resp.status(404).send({ message: `Aircraft with id [${id}] not found` });
    }
  },
});

export const getAllAircrafts: AircraftRoute = (aircraftService) => ({
  method: 'GET',
  url: '/api/aircrafts',
  handler: async function (_req, resp) {
    const aircrafts = await aircraftService.all();
    resp.status(200).send({ data: aircrafts });
  },
});

export const createNewAircraft: AircraftRoute = (aircraftService) => ({
  method: 'POST',
  url: '/api/aircrafts',
  handler: async function (req, resp) {
    const body = req.body as AircraftView;
    const aircraftId = await aircraftService.persist(body);
    resp.status(201).send({ message: `Saved new aircraft`, id: aircraftId });
  },
});

export const updateAircraft: AircraftRoute = (aircraftService) => ({
  method: 'PUT',
  url: '/api/aircrafts/:id',
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
    },
  },
  handler: async function (req, resp) {
    const body = req.body as AircraftView;
    const { id } = req.params as { id: number };
    const aircraftId = await aircraftService.persist(body, id);
    resp.status(200).send({ message: `Update aircraft`, id: aircraftId });
  },
});

export const deleteAircraft: AircraftRoute = (aircraftService) => ({
  method: 'DELETE',
  url: '/api/aircrafts/:id',
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
    },
  },
  handler: async function (req, resp) {
    const { id } = req.params as { id: number };
    await aircraftService.delete(id);
    resp.status(200).send({ message: 'Deleted aircraft' });
  },
});
