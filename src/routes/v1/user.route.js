import express from "express";
import { Validator } from "express-json-validator-middleware";

import {
  addUser,
  getUsers,
  getUser,
} from "../../controllers/user.controller.js";
import { addUserSchema } from "../../validations/users-request.schema.js";

const router = express.Router();
const { validate } = new Validator();

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *           description: The user's name.
 *           example: John Doe
 *         email:
 *           type: string
 *           description: The user's email address.
 *           example: john.doe@example.com
 *         rollNumber:
 *           type: string
 *           description: The user's roll number.
 *           example: 123456
 *         batch:
 *           type: string
 *           description: The user's batch.
 *           example: 2022
 *         profileImage:
 *           type: string
 *           description: The URL of the user's profile image.
 *           example: https://placehold.co/600x400
 *
 *     CreateUserRequest:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *           description: The user's name.
 *           example: John Doe
 *         email:
 *           type: string
 *           description: The user's email address.
 *           example: john.doe@example.com
 *         rollNumber:
 *           type: string
 *           description: The user's roll number.
 *           example: 123456
 *         batch:
 *           type: string
 *           description: The user's batch.
 *           example: 2022
 *         profileImage:
 *           type: string
 *           description: The URL of the user's profile image.
 *           example: https://placehold.co/600x400
 *
 *     CreateUserSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Flag stating status of API call
 *           example: true
 *         body:
 *           $ref: '#/components/schemas/User'
 */

/**
 * @openapi
 * /v1/users:
 *   post:
 *     tags:
 *       - v1
 *     description: Endpoint to create/add new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       200:
 *         description: Application health details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserSuccess'
 *
 */
router
  .route("/")
  .post(validate({ body: addUserSchema }), addUser)
  .get(getUsers);

router.route("/:userId").get(getUser);

export default router;
