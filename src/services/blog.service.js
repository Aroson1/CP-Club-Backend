import db from "../models/index.js";

const { Blog } = db.db;

const findAll = async () => Blog.findAll();

const getTotalBlogsCount = async () => Blog.count();

const findById = async (blogId) =>
  Blog.findOne({
    where: { id: blogId },
  });

const create = async (data) => Blog.create(data);

const update = async (blogId, data) => {
  const blog = await findById(blogId);
  if (!blog) {
    return null;
  }
  return blog.update(data);
};

const remove = async (blogId) => {
  const blog = await findById(blogId);
  if (!blog) {
    return false;
  }
  await blog.destroy();
  return true;
};

const findList = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  return Blog.findAll({
    attributes: [
      "title",
      "image",
      "authorImage",
      "authorName",
      "date",
      "tags",
      "id",
    ],
    limit,
    offset,
  });
};

const getBlogsForAdmin = async () => {
  return Blog.findAll({
    attributes: [
      "title",
      "image",
      "authorImage",
      "authorName",
      "date",
      "tags",
      "id",
    ],
  });
};

const getBlogAndIncrementView = async (blogId) => {
  const blog = await findById(blogId);
  if (!blog) {
    return null;
  }
  blog.views += 1;
  await blog.save();
  return blog;
};

export {
  findAll,
  findById,
  create,
  update,
  remove,
  findList,
  getBlogAndIncrementView,
  getTotalBlogsCount,
  getBlogsForAdmin,
};
