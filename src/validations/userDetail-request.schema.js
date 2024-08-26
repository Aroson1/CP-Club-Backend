const addUserDetailSchema = {
    type: "object",
    properties: {
      userId: {
        type: "integer",
      },
      linkedIn: {
        type: "string",
        nullable: true,
      },
      github: {
        type: "string",
        nullable: true,
      },
      codeforces: {
        type: "string",
        nullable: true,
      },
      codechef: {
        type: "string",
        nullable: true,
      },
      leetcode: {
        type: "string",
        nullable: true,
      },
      verified: {
        type: "boolean",
      },
    },
    required: ["userId"],
    additionalProperties: false,
  };
  
  export { addUserDetailSchema };
  