const addBlogSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    image: {
      type: "string",
    },
    authorImage: {
      type: "string",
    },
    authorName: {
      type: "string",
    },
    date: {
      type: "string",
    },
    comments: {
      type: "integer",
    },
    views: {
      type: "integer",
    },
    content: {
      type: "string",
    },
    tags: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  required: [
    "title",
    "image",
    "authorImage",
    "authorName",
    "date",
    "content",
    "tags",
  ],
  additionalProperties: false,
};

export { addBlogSchema };
