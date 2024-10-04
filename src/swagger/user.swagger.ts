export const userSwagger = {
  "/user/get-all": {
    get: {
      tags: ["User"],
      summary: "Get all users with populated movies and reactions",
      description:
        "Fetches all users along with their associated movies and movie reactions.",
      responses: {
        200: {
          description: "A list of users was successfully retrieved.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  message: {
                    type: "string",
                    example: "User fetched successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      count: { type: "integer", example: 5 },
                      users: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            _id: {
                              type: "string",
                              example: "60d0fe4f5311236168a109ca",
                            },
                            username: { type: "string", example: "john_doe" },
                            email: {
                              type: "string",
                              example: "john@example.com",
                            },
                            movies: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  title: {
                                    type: "string",
                                    example: "Inception",
                                  },
                                  posterUrl: {
                                    type: "string",
                                    example: "https://poster.url/inception.jpg",
                                  },
                                  reactions: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        user: {
                                          type: "object",
                                          properties: {
                                            username: {
                                              type: "string",
                                              example: "jane_doe",
                                            },
                                            email: {
                                              type: "string",
                                              example: "jane@example.com",
                                            },
                                          },
                                        },
                                        reactionType: {
                                          type: "string",
                                          example: "like",
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Failed to retrieve users.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: { type: "string", example: "Failed to fetch users" },
                  error: { type: "string", example: "Error details" },
                },
              },
            },
          },
        },
      },
    },
  },
};
