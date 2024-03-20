import { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import {
  createNewAircraft,
  deleteAircraft,
  findOneAircraft,
  getAllAircrafts,
  updateAircraft,
} from './aircraft/routes';
import { AircraftService, SeatTypeService } from '../service';
import { seed } from '../repository';
import {
  allSeatTypes,
  createSeatType,
  deleteSeatType,
  getSeatType,
  updateSeatType,
} from './seat-types/routes';

export const fastifyApp = async (
  aircraftService: AircraftService,
  seatTypeService: SeatTypeService,
) => {
  const fastify: FastifyInstance = Fastify({
    logger: true,
  }).withTypeProvider<JsonSchemaToTsProvider>();

  fastify.get('/seed', async (_req, resp) => {
    await seed();
    resp.status(200).send({ message: 'Executed seed' });
  });

  // Aircrafts Routes ================================
  fastify.route(getAllAircrafts(aircraftService));
  fastify.route(findOneAircraft(aircraftService));
  fastify.route(createNewAircraft(aircraftService));
  fastify.route(updateAircraft(aircraftService));
  fastify.route(deleteAircraft(aircraftService));

  // Seat Types Routes ================================
  fastify.route(allSeatTypes(seatTypeService));
  fastify.route(getSeatType(seatTypeService));
  fastify.route(createSeatType(seatTypeService));
  fastify.route(updateSeatType(seatTypeService));
  fastify.route(deleteSeatType(seatTypeService));

  return fastify;
};
