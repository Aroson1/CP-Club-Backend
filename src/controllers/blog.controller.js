import httpStatus from "http-status";

import * as errors from "../utils/api-error.js";
import * as response from "../middlewares/response-handler.js";
import {
  findAll,
  findById,
  create,
  update,
  remove,
  findList,
  getBlogAndIncrementView,
  getTotalBlogsCount,
  getBlogsForAdmin,
} from "../services/blog.service.js";

const responseHandler = response.default;
const { NotFoundError } = errors.default;

const addBlog = async (req, res) => {
  const blogDetails = await create(req.body);
  res.status(httpStatus.CREATED).send(responseHandler(blogDetails));
};

const getBlogs = async (req, res) => {
  const blogs = await findAll();
  res.status(httpStatus.OK).send(responseHandler(blogs));
};

const getBlog = async (req, res) => {
  const blog = await getBlogAndIncrementView(req.params.blogId);
  if (!blog) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(blog));
};

const getBlogContent = async (req, res) => {
  const blog = await findById(req.params.blogId);
  if (!blog) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(blog));
};

const getAdminBlogs = async (req, res) => {
  const blogs = await getBlogsForAdmin();
  res.status(httpStatus.OK).send(responseHandler(blogs));
}


const getBlogList = async (req, res) => {
  const { page, limit } = req.query;
  const blogs = await findList(page, limit);
  const count = await getTotalBlogsCount();
  res.status(httpStatus.OK).send(responseHandler({blogs, count}));
};

const updateBlog = async (req, res) => {
  const blog = await update(req.params.blogId, req.body);
  if (!blog) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(blog));
};

const deleteBlog = async (req, res) => {
  const success = await remove(req.params.blogId);
  if (!success) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send();
};

export { addBlog, getBlogs, getBlog, getBlogList, updateBlog, deleteBlog, getBlogContent, getAdminBlogs };
