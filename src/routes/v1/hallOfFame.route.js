import express from 'express';
import { Validator } from 'express-json-validator-middleware';

import {
  getHallOfFameEntries,
  getHallOfFameEntry,
  createHallOfFameEntry,
  updateHallOfFameEntry,
  deleteHallOfFameEntry,
} from '../../controllers/hallOfFame.controller.js';
import authorizeAdmin from '../../middlewares/authorizationMiddleware.js'; 

const router = express.Router();
const { validate } = new Validator();

/**
 * @openapi
 * components:
 *   schemas:
 *     HallOfFame:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ID of the Hall of Fame entry.
 *           example: 1
 *         name:
 *           type: string
 *           description: The name of the individual.
 *           example: John Doe
 *         title:
 *           type: string
 *           description: The title of the individual.
 *           example: Software Engineer
 *         company:
 *           type: string
 *           description: The company where the individual works.
 *           example: Google
 *         image:
 *           type: string
 *           description: The URL of the individual's image.
 *           example: https://i.imgur.com/hczKIze.jpg
 *         description:
 *           type: string
 *           description: A description of the individual's achievements.
 *           example: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore magna aliqua.
 */

/**
 * @openapi
 * /v1/hallOfFame:
 *   get:
 *     tags:
 *       - v1
 *     description: Retrieve all Hall of Fame entries.
 *     responses:
 *       200:
 *         description: A list of Hall of Fame entries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HallOfFame'
 *
 *   post:
 *     tags:
 *       - v1
 *     description: Create a new Hall of Fame entry.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HallOfFame'
 *     responses:
 *       201:
 *         description: Successfully created a new Hall of Fame entry.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HallOfFame'
 */

router
  .route('/')
  .get(getHallOfFameEntries)
  .post(authorizeAdmin, createHallOfFameEntry); 

/**
 * @openapi
 * /v1/hallOfFame/{id}:
 *   get:
 *     tags:
 *       - v1
 *     description: Retrieve a specific Hall of Fame entry by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the Hall of Fame entry.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A Hall of Fame entry.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HallOfFame'
 *
 *   put:
 *     tags:
 *       - v1
 *     description: Update a specific Hall of Fame entry by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the Hall of Fame entry.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HallOfFame'
 *     responses:
 *       200:
 *         description: Successfully updated the Hall of Fame entry.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HallOfFame'
 *
 *   delete:
 *     tags:
 *       - v1
 *     description: Delete a specific Hall of Fame entry by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the Hall of Fame entry.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successfully deleted the Hall of Fame entry.
 */

router
  .route('/:id')
  .get(getHallOfFameEntry)
  .put(authorizeAdmin, updateHallOfFameEntry) 
  .delete(authorizeAdmin, deleteHallOfFameEntry); 

export default router;
