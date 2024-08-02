import express from "express";
import { Validator } from "express-json-validator-middleware";

import {
  addBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  getBlogList,
} from "../../controllers/blog.controller.js";
import { addBlogSchema } from "../../validations/blogs-request.schema.js";

const router = express.Router();
const { validate } = new Validator();

/**
 * @openapi
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The blog's title.
 *           example: Facing a challenge is kind of a turn-on for an easy rider
 *         image:
 *           type: string
 *           description: The URL of the blog's main image.
 *           example: https://placehold.co/600x400@2x.png
 *         authorImage:
 *           type: string
 *           description: The URL of the author's image.
 *           example: https://placehold.co/600x400@2x.png
 *         authorName:
 *           type: string
 *           description: The author's name.
 *           example: ME
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the blog post.
 *           example: 2024-07-25
 *         comments:
 *           type: integer
 *           description: The number of comments.
 *           example: 50
 *         views:
 *           type: integer
 *           description: The number of views.
 *           example: 35
 *         content:
 *           type: string
 *           description: The main content of the blog post.
 *           example: "string"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the blog post.
 *           example: ["Design", "Development", "Info"]
 *
 *     CreateBlogRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         image:
 *           type: string
 *         authorImage:
 *           type: string
 *         authorName:
 *           type: string
 *         date:
 *           type: string
 *           format: date
 *         comments:
 *           type: integer
 *         views:
 *           type: integer
 *         content:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *
 *     CreateBlogSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Flag stating status of API call
 *           example: true
 *         body:
 *           $ref: '#/components/schemas/Blog'
 */

/**
 * @openapi
 * /v1/blogs:
 *   post:
 *     tags:
 *       - v1
 *     description: Endpoint to create/add new blog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBlogRequest'
 *     responses:
 *       200:
 *         description: Blog created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateBlogSuccess'
 *
 *   get:
 *     tags:
 *       - v1
 *     description: Endpoint to get all blogs with pagination
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: List of blogs with pagination.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 */
router
  .route("/")
  .post(validate({ body: addBlogSchema }), addBlog)
  .get(getBlogList);

router
  .route("/:blogId")
  .get(getBlog)
  .put(validate({ body: addBlogSchema }), updateBlog)
  .delete(deleteBlog);

export default router;
