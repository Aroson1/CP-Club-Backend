const addEventSchema = {
  type: "object",
  properties: {
    blogId: {
      type: "integer",
    },
    title: {
      type: "string",
    },
    date: {
      type: "string",
    },
    imageUrl: {
      type: "string",
    },
  },
  required: ["blogId", "title", "date", "imageUrl"],
  additionalProperties: false,
};

export { addEventSchema };
