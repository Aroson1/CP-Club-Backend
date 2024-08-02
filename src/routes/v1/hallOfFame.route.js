import express from "express";
import { Validator } from "express-json-validator-middleware";

import {
  addHallOfFame,
  getHallOfFame,
  getHallOfFameMember,
  updateHallOfFame,
  deleteHallOfFame,
} from "../../controllers/hallOfFame.controller.js";
import { hallOfFameSchema } from "../../validations/hallOfFame-request.schema.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     HallOfFame:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The Hall of Fame entry ID.
 *           example: 1
 *         userId:
 *           type: integer
 *           description: The ID of the user associated with this entry.
 *           example: 1
 *         title:
 *           type: string
 *           description: The title of the Hall of Fame entry.
 *           example: Outstanding Achievement in Programming
 *         description:
 *           type: string
 *           description: A description of the achievement.
 *           example: Developed a revolutionary algorithm that significantly improved system performance.
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *             email:
 *               type: string
 *
 *     CreateHallOfFameRequest:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *
 *     CreateHallOfFameSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Flag stating status of API call
 *           example: true
 *         body:
 *           $ref: '#/components/schemas/HallOfFame'
 */

const router = express.Router();
const { validate } = new Validator();

/**
 * @openapi
 * /v1/hall-of-fame:
 *   post:
 *     tags:
 *       - v1
 *     description: Endpoint to create a new Hall of Fame entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateHallOfFameRequest'
 *     responses:
 *       201:
 *         description: Hall of Fame entry created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateHallOfFameSuccess'
 *
 *   get:
 *     tags:
 *       - v1
 *     description: Endpoint to get all Hall of Fame entries
 *     responses:
 *       200:
 *         description: List of Hall of Fame entries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HallOfFame'
 */
router
  .route("/")
  .post(validate({ body: hallOfFameSchema }), addHallOfFame)
  .get(getHallOfFame);

/**
 * @openapi
 * /v1/hall-of-fame/{id}:
 *   get:
 *     tags:
 *       - v1
 *     description: Endpoint to get a Hall of Fame entry by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Hall of Fame entry details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HallOfFame'
 *       404:
 *         description: Hall of Fame entry not found.
 *
 *   put:
 *     tags:
 *       - v1
 *     description: Endpoint to update a Hall of Fame entry by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateHallOfFameRequest'
 *     responses:
 *       200:
 *         description: Hall of Fame entry updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HallOfFame'
 *       404:
 *         description: Hall of Fame entry not found.
 *
 *   delete:
 *     tags:
 *       - v1
 *     description: Endpoint to delete a Hall of Fame entry by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Hall of Fame entry deleted successfully.
 *       404:
 *         description: Hall of Fame entry not found.
 */
router
  .route("/:id")
  .get(getHallOfFameMember)
  .put(validate({ body: hallOfFameSchema }), updateHallOfFame)
  .delete(deleteHallOfFame);

export default router;