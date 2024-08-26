import express from "express";
import { Validator } from "express-json-validator-middleware";

import {
  addEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} from "../../controllers/event.controller.js";
import { addEventSchema } from "../../validations/events-request.schema.js";
import authorizeAdmin from "../../middlewares/authorizationMiddleware.js"; 

const router = express.Router();
const { validate } = new Validator();

/**
 * @openapi
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         blogId:
 *           type: integer
 *           description: The ID of the related blog.
 *           example: 23
 *         title:
 *           type: string
 *           description: The event's title.
 *           example: Event Title 1
 *         date:
 *           type: string
 *           format: date
 *           description: The event's date.
 *           example: 20/10/2130
 *         imageUrl:
 *           type: string
 *           description: The URL of the event's image.
 *           example: https://img.freepik.com/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg
 *
 *     CreateEventRequest:
 *       type: object
 *       properties:
 *         blogId:
 *           type: integer
 *         title:
 *           type: string
 *         date:
 *           type: string
 *           format: date
 *         imageUrl:
 *           type: string
 *
 *     CreateEventSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Flag stating status of API call
 *           example: true
 *         body:
 *           $ref: '#/components/schemas/Event'
 */

/**
 * @openapi
 * /v1/events:
 *   post:
 *     tags:
 *       - v1
 *     description: Endpoint to create/add new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventRequest'
 *     responses:
 *       201:
 *         description: Event created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateEventSuccess'
 *
 *   get:
 *     tags:
 *       - v1
 *     description: Endpoint to get all events
 *     responses:
 *       200:
 *         description: List of events.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */
router
  .route("/")
  .post(authorizeAdmin, validate({ body: addEventSchema }), addEvent) 
  .get(getEvents);

/**
 * @openapi
 * /v1/events/{eventId}:
 *   get:
 *     tags:
 *       - v1
 *     description: Endpoint to get event details by ID
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found.
 *
 *   put:
 *     tags:
 *       - v1
 *     description: Endpoint to update event details by ID
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventRequest'
 *     responses:
 *       200:
 *         description: Event updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found.
 *
 *   delete:
 *     tags:
 *       - v1
 *     description: Endpoint to delete event by ID
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event deleted successfully.
 *       404:
 *         description: Event not found.
 */
router
  .route("/:eventId")
  .get(getEvent)
  .put(authorizeAdmin, validate({ body: addEventSchema }), updateEvent) 
  .delete(authorizeAdmin, deleteEvent); 

export default router;
