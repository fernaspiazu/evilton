import { RouteOptions } from "fastify";
import { SeatTypeService, SeatTypeView } from "../../service";

export type SeatTypeRoute = (s: SeatTypeService) => RouteOptions

export const allSeatTypes: SeatTypeRoute = (seatTypeService) => ({
  method: "GET",
  url: "/api/seat-types",
  handler: async function(_req, resp) {
    const seatTypes = await seatTypeService.all();
    resp.status(200).send({ data: seatTypes });
  }
})

export const getSeatType: SeatTypeRoute = (seatTypeService) => ({
  method: "GET",
  url: "/api/seat-types/:id",
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
    },
  },
  handler: async function(req, resp) {
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
})

export const createSeatType: SeatTypeRoute = (seatTypeService) => ({
  method: "POST",
  url: "/api/seat-types",
  handler: async function(req, resp) {
    const body = req.body as SeatTypeView;
    const seatTypeId = await seatTypeService.persist(body);
    resp.status(201).send({ message: `Saved new seat type`, id: seatTypeId });
  }
})

export const updateSeatType: SeatTypeRoute = (seatTypeService) => ({
  method: "PUT",
  url: "/api/seat-types/:id",
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
    },
  },
  handler: async function(req, resp) {
    const body = req.body as SeatTypeView;
    const { id } = req.params as { id: string };
    const seatTypeId = await seatTypeService.persist(body, id);
    resp.status(200).send({ message: `Updated seat type`, id: seatTypeId });
  }
})

export const deleteSeatType: SeatTypeRoute = (seatTypeService) => ({
  method: "DELETE",
  url: "/api/seat-types/:id",
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
    },
  },
  handler: async function(req, resp) {
    const { id } = req.params as { id: string };
    await seatTypeService.delete(id);
    resp.status(200).send({ message: 'Deleted seat type' });
  }
})