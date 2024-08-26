import httpStatus from "http-status";
import * as response from "../middlewares/response-handler.js";
import {
  findAllUserDetails,
  findUserDetailById,
  findUserDetailByUserId,
  createUserDetail,
  updateUserDetail as updateUserDetailService,
  deleteUserDetail as deleteUserDetailService,
} from "../services/userDetail.service.js";

const responseHandler = response.default;

const addUserDetail = async (req, res) => {
  const userDetail = await createUserDetail(req.body);
  res.status(httpStatus.CREATED).send(responseHandler(userDetail));
};

const getUserDetails = async (req, res) => {
  const userDetails = await findAllUserDetails();
  res.status(httpStatus.OK).send(responseHandler(userDetails));
};

const getUserDetail = async (req, res) => {
  const userDetail = await findUserDetailById(req.params.userDetailId);
  res.status(httpStatus.OK).send(responseHandler(userDetail));
};

const getUserDetailByUserId = async (req, res) => {
  const userDetail = await findUserDetailByUserId(req.params.userId);
  res.status(httpStatus.OK).send(responseHandler(userDetail));
};

const updateUserDetail = async (req, res) => {
  const userDetail = await updateUserDetailService(req.params.userId, req.body);
  res.status(httpStatus.OK).send(responseHandler(userDetail));
};

const deleteUserDetail = async (req, res) => {
  await deleteUserDetailService(req.params.userDetailId);
  res.status(httpStatus.NO_CONTENT).send();
};

export {
  addUserDetail,
  getUserDetails,
  getUserDetail,
  getUserDetailByUserId,
  updateUserDetail,
  deleteUserDetail,
};
