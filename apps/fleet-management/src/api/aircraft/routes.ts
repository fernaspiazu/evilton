import { RouteOptions } from 'fastify';
import { AircraftService, AircraftView } from '../../service';

export type AircraftRoute = (s: AircraftService) => RouteOptions;

const modelParam = {
  type: 'object',
  properties: {
    model: { type: 'string' },
  },
};

export const findOneAircraft: AircraftRoute = (aircraftService) => ({
  method: 'GET',
  url: '/api/aircrafts/:model',
  schema: { params: modelParam },
  handler: async function (req, resp) {
    const { model } = req.params as { model: string };
    const aircraft = await aircraftService.findByModel(model);
    if (aircraft) {
      resp.status(200).send({ data: aircraft });
    } else {
      resp
        .status(404)
        .send({ message: `Aircraft with id [${model}] not found` });
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
  url: '/api/aircrafts/:model',
  schema: { params: modelParam },
  handler: async function (req, resp) {
    const body = req.body as AircraftView;
    const { model } = req.params as { model: string };
    const aircraftId = await aircraftService.persist(body, model);
    resp.status(200).send({ message: `Update aircraft`, id: aircraftId });
  },
});

export const deleteAircraft: AircraftRoute = (aircraftService) => ({
  method: 'DELETE',
  url: '/api/aircrafts/:model',
  schema: { params: modelParam },
  handler: async function (req, resp) {
    const { model } = req.params as { model: string };
    await aircraftService.delete(model);
    resp.status(200).send({ message: 'Deleted aircraft' });
  },
});
