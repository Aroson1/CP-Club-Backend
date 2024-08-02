import express from "express";
import { Validator } from "express-json-validator-middleware";

import {
  addResource,
  getResources,
  getResource,
  updateResource,
  deleteResource,
  updateResourcesList,
} from "../../controllers/resource.controller.js";
import {
  addResourceSchema,
  updateResourceListSchema,
} from "../../validations/resources-request.schema.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     Resource:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The resource ID.
 *           example: 1
 *         resourceTitle:
 *           type: string
 *           description: The title of the resource.
 *           example: Dynamic Programming
 *         listOfResources:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the individual resource.
 *               link:
 *                 type: string
 *                 description: The link to the individual resource.
 *
 *     CreateResourceRequest:
 *       type: object
 *       properties:
 *         resourceTitle:
 *           type: string
 *         listOfResources:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               link:
 *                 type: string
 *
 *     CreateResourceSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Flag stating status of API call
 *           example: true
 *         body:
 *           $ref: '#/components/schemas/Resource'
 */

const router = express.Router();
const { validate } = new Validator();

/**
 * @openapi
 * /v1/resources:
 *   post:
 *     tags:
 *       - v1
 *     description: Endpoint to create/add new resource
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateResourceRequest'
 *     responses:
 *       201:
 *         description: Resource created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateResourceSuccess'
 *
 *   get:
 *     tags:
 *       - v1
 *     description: Endpoint to get all resources
 *     responses:
 *       200:
 *         description: List of resources.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resource'
 */
router
  .route("/")
  .post(validate({ body: addResourceSchema }), addResource)
  .get(getResources);

/**
 * @openapi
 * /v1/resources/{resourceId}:
 *   get:
 *     tags:
 *       - v1
 *     description: Endpoint to get resource details by ID
 *     parameters:
 *       - in: path
 *         name: resourceId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Resource details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Resource not found.
 *
 *   put:
 *     tags:
 *       - v1
 *     description: Endpoint to update resource details by ID
 *     parameters:
 *       - in: path
 *         name: resourceId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateResourceRequest'
 *     responses:
 *       200:
 *         description: Resource updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Resource not found.
 *
 *   delete:
 *     tags:
 *       - v1
 *     description: Endpoint to delete resource by ID
 *     parameters:
 *       - in: path
 *         name: resourceId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Resource deleted successfully.
 *       404:
 *         description: Resource not found.
 */
router
  .route("/:resourceId")
  .get(getResource)
  .put(validate({ body: addResourceSchema }), updateResource)
  .delete(deleteResource);

/**
 * @openapi
 * /v1/resources/{resourceId}/list:
 *   put:
 *     tags:
 *       - v1
 *     description: Endpoint to update the list of resources for a specific resource title
 *     parameters:
 *       - in: path
 *         name: resourceId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 link:
 *                   type: string
 *     responses:
 *       200:
 *         description: Resource list updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Resource not found.
 */
router
  .route("/:resourceId/list")
  .put(validate({ body: updateResourceListSchema }), updateResourcesList);

export default router;