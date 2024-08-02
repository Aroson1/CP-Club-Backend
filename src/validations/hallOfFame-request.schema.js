const hallOfFameSchema = {
    type: "object",
    properties: {
      userId: {
        type: "integer",
      },
      title: {
        type: "string",
      },
      description: {
        type: "string",
      },
    },
    required: ["userId", "title", "description"],
    additionalProperties: false,
  };
  
  export { hallOfFameSchema };