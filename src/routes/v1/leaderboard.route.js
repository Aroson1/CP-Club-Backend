import express from "express";

import {
  updateSemPoints,
  getLeaderboard,
  updateMultipleSemPoints,
} from "../../controllers/leaderboard.controller.js";
import authorizeAdmin from "../../middlewares/authorizationMiddleware.js";

const router = express.Router();

/**
 * @openapi
 * /v1/leaderboard:
 *   get:
 *     tags:
 *       - v1
 *     description: Get the leaderboard based on sem and year
 *     parameters:
 *       - in: query
 *         name: sem
 *         required: true
 *         schema:
 *           type: string
 *           enum: [ODD, EVEN]
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Leaderboard
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userName:
 *                     type: string
 *                   profileImage:
 *                     type: string
 *                   points:
 *                     type: integer
 *                   batch:
 *                     type: string
 *
 * /v1/leaderboard/:userId:
 *   put:
 *     tags:
 *       - v1
 *     description: Update sem points for a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sem:
 *                 type: string
 *                 enum: [ODD, EVEN]
 *               year:
 *                 type: integer
 *               points:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Updated sem points
 */

router.route("/").get(getLeaderboard);

router.route("/updateMultiple").put(authorizeAdmin, updateMultipleSemPoints);

router.route("/:userId").put(authorizeAdmin, updateSemPoints);

export default router;
