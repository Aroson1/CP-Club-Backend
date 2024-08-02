import db from "../models/index.js";

const { Resource } = db.db;

const findAll = async () => Resource.findAll();

const findById = async (resourceId) =>
  Resource.findOne({
    where: { id: resourceId },
  });

const create = async (data) => Resource.create(data);

const update = async (resourceId, data) => {
  const resource = await findById(resourceId);
  if (!resource) {
    return null;
  }
  return resource.update(data);
};

const remove = async (resourceId) => {
  const resource = await findById(resourceId);
  if (!resource) {
    return false;
  }
  await resource.destroy();
  return true;
};

const updateResourceList = async (resourceId, newList) => {
  const resource = await findById(resourceId);
  if (!resource) {
    return null;
  }
  resource.listOfResources = newList;
  return resource.save();
};

export { findAll, findById, create, update, remove, updateResourceList };