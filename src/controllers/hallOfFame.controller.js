import httpStatus from 'http-status';
import * as response from '../middlewares/response-handler.js';
import * as errors from '../utils/api-error.js';
import { findAll, findById, create, updateById, deleteById } from '../services/hallOfFame.service.js';

const responseHandler = response.default;
const { NotFoundError } = errors.default;

const getHallOfFameEntries = async (req, res) => {
  const entries = await findAll();
  res.status(httpStatus.OK).send(responseHandler(entries));
};

const getHallOfFameEntry = async (req, res) => {
  const entry = await findById(req.params.id);
  if (!entry) {
    throw new NotFoundError();
  }
  res.status(httpStatus.OK).send(responseHandler(entry));
};

const createHallOfFameEntry = async (req, res) => {
  const entry = await create(req.body);
  res.status(httpStatus.CREATED).send(responseHandler(entry));
};

const updateHallOfFameEntry = async (req, res) => {
  const updatedEntry = await updateById(req.params.id, req.body);
  if (!updatedEntry) {
    throw new NotFoundError();
  }
  res.status(httpStatus.OK).send(responseHandler(updatedEntry));
};

const deleteHallOfFameEntry = async (req, res) => {
  const deleted = await deleteById(req.params.id);
  if (!deleted) {
    throw new NotFoundError();
  }
  res.status(httpStatus.NO_CONTENT).send();
};

export {
  getHallOfFameEntries,
  getHallOfFameEntry,
  createHallOfFameEntry,
  updateHallOfFameEntry,
  deleteHallOfFameEntry,
};
