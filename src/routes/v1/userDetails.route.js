import express from 'express';
import { Validator } from 'express-json-validator-middleware';
import { 
  addUserDetail, 
  getUserDetails, 
  getUserDetail, 
  getUserDetailByUserId, 
  updateUserDetail, 
  deleteUserDetail 
} from '../../controllers/userDetail.controller.js';
import { addUserDetailSchema } from '../../validations/userDetail-request.schema.js';

const router = express.Router();
const { validate } = new Validator();

router
  .route('/')
  .post(validate({ body: addUserDetailSchema }), addUserDetail)
  .get(getUserDetails);

router
  .route('/:userDetailId')
  .get(getUserDetail)
  .delete(deleteUserDetail);

router
  .route('/user/:userId')
  .get(getUserDetailByUserId)
  .put(validate({ body: addUserDetailSchema }), updateUserDetail);

export default router;
