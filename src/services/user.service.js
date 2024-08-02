import db from "../models/index.js";

const { User, SemPoint } = db.db;

const findAll = async () =>
  User.findAll({
    include: [{ model: SemPoint }],
  });

const findById = async (userId) =>
  User.findOne({
    where: { id: userId },
    include: [{ model: SemPoint }],
  });

const create = async (data) =>
  User.create(
    {
      userName: data.userName.replace(/-IIITK$/, ""),
      email: data.email,
      rollNumber: data.rollNumber,
      batch: data.batch,
      profileImage: data.profileImage,
    },
    {
      include: [{ model: SemPoint }],
    }
  );

export { findAll, findById, create };
