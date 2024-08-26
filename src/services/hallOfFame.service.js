import db from '../models/index.js';

const { HallOfFame } = db.db;

const findAll = async () => HallOfFame.findAll();

const findById = async (id) => HallOfFame.findOne({ where: { id } });

const create = async (data) => HallOfFame.create(data);

const updateById = async (id, data) => {
  const hallOfFameEntry = await HallOfFame.findOne({ where: { id } });
  if (hallOfFameEntry) {
    return hallOfFameEntry.update(data);
  }
  return null;
};

const deleteById = async (id) => HallOfFame.destroy({ where: { id } });

export {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
