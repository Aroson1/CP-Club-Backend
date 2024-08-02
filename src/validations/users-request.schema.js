const addUserSchema = {
  type: "object",
  properties: {
    userName: {
      type: "string",
    },
    email: {
      type: "string",
    },
    rollNumber: {
      type: "string",
    },
    batch: {
      type: "string",
    },
    profileImage: {
      type: "string",
    },
  },
  required: [
    "userName",
    "email",
    // 'rollNumber',
    // 'batch',
    "profileImage",
  ],
  additionalProperties: false,
};

export { addUserSchema };
