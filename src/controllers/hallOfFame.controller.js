import httpStatus from "http-status";

import * as errors from "../utils/api-error.js";
import * as response from "../middlewares/response-handler.js";
import {
  findAll,
  findById,
  create,
  update,
  remove,
} from "../services/hallOfFame.service.js";

const responseHandler = response.default;
const { NotFoundError } = errors.default;

const addHallOfFame = async (req, res) => {
  const hallOfFameDetails = await create(req.body);
  res.status(httpStatus.CREATED).send(responseHandler(hallOfFameDetails));
};

const getHallOfFame = async (req, res) => {
  const hallOfFame = await findAll();
  res.status(httpStatus.OK).send(responseHandler(hallOfFame));
};

const getHallOfFameMember = async (req, res) => {
  const hallOfFame = await findById(req.params.id);
  if (!hallOfFame) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(hallOfFame));
};

const updateHallOfFame = async (req, res) => {
  const hallOfFame = await update(req.params.id, req.body);
  if (!hallOfFame) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(hallOfFame));
};

const deleteHallOfFame = async (req, res) => {
  const success = await remove(req.params.id);
  if (!success) {
    throw new NotFoundError();
  }

  res.status(httpStatus.NO_CONTENT).send();
};

export {
  addHallOfFame,
  getHallOfFame,
  getHallOfFameMember,
  updateHallOfFame,
  deleteHallOfFame,
};