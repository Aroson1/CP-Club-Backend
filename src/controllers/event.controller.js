import httpStatus from "http-status";

import * as errors from "../utils/api-error.js";
import * as response from "../middlewares/response-handler.js";
import {
  findAll,
  findById,
  create,
  update,
  remove,
} from "../services/event.service.js";

const responseHandler = response.default;
const { NotFoundError } = errors.default;

const addEvent = async (req, res) => {
  const eventDetails = await create(req.body);
  res.status(httpStatus.CREATED).send(responseHandler(eventDetails));
};

const getEvents = async (req, res) => {
  const events = await findAll();
  res.status(httpStatus.OK).send(responseHandler(events));
};

const getEvent = async (req, res) => {
  const event = await findById(req.params.eventId);
  if (!event) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(event));
};

const updateEvent = async (req, res) => {
  const event = await update(req.params.eventId, req.body);
  if (!event) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(event));
};

const deleteEvent = async (req, res) => {
  const success = await remove(req.params.eventId);
  if (!success) {
    throw new NotFoundError();
  }

  res.status(httpStatus.NO_CONTENT).send();
};

export { addEvent, getEvents, getEvent, updateEvent, deleteEvent };
