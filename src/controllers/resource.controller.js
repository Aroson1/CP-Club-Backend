import httpStatus from "http-status";

import * as errors from "../utils/api-error.js";
import * as response from "../middlewares/response-handler.js";
import {
  findAll,
  findById,
  create,
  update,
  remove,
  updateResourceList,
} from "../services/resource.service.js";

const responseHandler = response.default;
const { NotFoundError } = errors.default;

const addResource = async (req, res) => {
  const resourceDetails = await create(req.body);
  res.status(httpStatus.CREATED).send(responseHandler(resourceDetails));
};

const getResources = async (req, res) => {
  const resources = await findAll();
  res.status(httpStatus.OK).send(responseHandler(resources));
};

const getResource = async (req, res) => {
  const resource = await findById(req.params.resourceId);
  if (!resource) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(resource));
};

const updateResource = async (req, res) => {
  const resource = await update(req.params.resourceId, req.body);
  if (!resource) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(resource));
};

const deleteResource = async (req, res) => {
  const success = await remove(req.params.resourceId);
  if (!success) {
    throw new NotFoundError();
  }

  res.status(httpStatus.NO_CONTENT).send();
};

const updateResourcesList = async (req, res) => {
  const resource = await updateResourceList(req.params.resourceId, req.body);
  if (!resource) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(resource));
};

export {
  addResource,
  getResources,
  getResource,
  updateResource,
  deleteResource,
  updateResourcesList,
};