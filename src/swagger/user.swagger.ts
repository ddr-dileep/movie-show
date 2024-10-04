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

  "/user/get-one/{id}": {
    get: {
      tags: ["User"],
      summary: "Get a user by ID",
      description: "Fetches a single user by their unique ID.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "The ID of the user to retrieve.",
          schema: {
            type: "string",
            example: "66fbc58ffb3206c8029c52c8",
          },
        },
      ],
      responses: {
        200: {
          description: "The user was successfully retrieved.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "User fetched successfully",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "User not found.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: { type: "string", example: "User not found" },
                  error_type: { type: "string", example: "invalid details" },
                },
              },
            },
          },
        },
      },
    },
  },

  "/user/register": {
    post: {
      tags: ["User"],
      summary: "Register a new user",
      description:
        "Creates a new user in the system by registering their details.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                username: { type: "string", example: "john_doe" },
                email: { type: "string", example: "john@example.com" },
                password: { type: "string", example: "password123" },
                role: { type: "string", example: "user" },
              },
              required: ["username", "email", "password"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "User successfully registered.",
        },
        400: {
          description: "Bad request, invalid or missing user data.",
        },
      },
    },
  },
};
