const addResourceSchema = {
  type: "object",
  properties: {
    resourceTitle: {
      type: "string",
    },
    listOfResources: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          link: { type: "string" },
        },
        required: ["title", "link"],
      },
    },
  },
  required: ["resourceTitle", "listOfResources"],
  additionalProperties: false,
};

const updateResourceListSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      title: { type: "string" },
      link: { type: "string" },
    },
    required: ["title", "link"],
  },
};

export { addResourceSchema, updateResourceListSchema };
