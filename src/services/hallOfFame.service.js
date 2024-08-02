import db from "../models/index.js";

const { HallOfFame, User } = db.db;

const findAll = async () => HallOfFame.findAll({
  include: [{ model: User, as: "user" }]
});

const findById = async (id) =>
  HallOfFame.findOne({
    where: { id },
    include: [{ model: User, as: "user"}]
  });

const create = async (data) => HallOfFame.create(data);

const update = async (id, data) => {
  const hallOfFame = await findById(id);
  if (!hallOfFame) {
    return null;
  }
  return hallOfFame.update(data);
};

const remove = async (id) => {
  const hallOfFame = await findById(id);
  if (!hallOfFame) {
    return false;
  }
  await hallOfFame.destroy();
  return true;
};

export { findAll, findById, create, update, remove };