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
    role: {
      type: "string",
    },
  },
  required: [
    // "userName",
    // "email",
    // // 'rollNumber',
    // // 'batch',
    // "profileImage",
  ],
  additionalProperties: true,
};

export { addUserSchema };
