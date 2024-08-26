import db from "../models/index.js";

const { UserDetail } = db.db;

const findAllUserDetails = async () => UserDetail.findAll();

const findUserDetailById = async (userDetailId) =>
  UserDetail.findOne({
    where: { id: userDetailId },
  });

const findUserDetailByUserId = async (userId) =>
  UserDetail.findOne({
    where: { userId },
  });

const createUserDetail = async (data) => UserDetail.create(data);

const updateUserDetail = async (userId, data) => {
  const userDetail = await UserDetail.findOne({
    where: { userId: userId },
  });
  if (userDetail) {
    return userDetail.update(data);
  } else {
    return createUserDetail(data);
  }
  return null;
};

const deleteUserDetail = async (userDetailId) => {
  const userDetail = await UserDetail.findOne({ where: { id: userDetailId } });
  if (userDetail) {
    return userDetail.destroy();
  }
  return null;
};

export {
  findAllUserDetails,
  findUserDetailById,
  findUserDetailByUserId,
  createUserDetail,
  updateUserDetail,
  deleteUserDetail,
};
