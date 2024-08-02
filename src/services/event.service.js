import db from "../models/index.js";

const { Event } = db.db;

const findAll = async () => Event.findAll();

const findById = async (eventId) =>
  Event.findOne({
    where: { id: eventId },
  });

const create = async (data) => Event.create(data);

const update = async (eventId, data) => {
  const event = await findById(eventId);
  if (!event) {
    return null;
  }
  return event.update(data);
};

const remove = async (eventId) => {
  const event = await findById(eventId);
  if (!event) {
    return false;
  }
  await event.destroy();
  return true;
};

export { findAll, findById, create, update, remove };
