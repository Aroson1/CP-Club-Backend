const addHallOfFameSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    title: { type: "string" },
    image: { type: "string" },
    description: { type: "string" },
  },
  required: ["name", "title", "image", "description"],
  additionalProperties: false,
};

export { addHallOfFameSchema };
