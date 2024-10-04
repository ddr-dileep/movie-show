import { Options } from "swagger-jsdoc";
import { userSwagger } from "../swagger/user.swagger";

const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Movie API Documentation",
      version: "1.0.0",
      description:
        "This API provides access to the latest movie quotes, along with relevant information such as rating, author, author bio, and movie name. \n\n\n![User Response Example](https://miro.medium.com/v2/resize:fit:1400/0*w0dh2xBvElRc51bm.png)",
    },
    servers: [
      {
        url: "http://localhost:8080/api/v1",
        description: "Development server",
      },
      {
        url: "https://movie-show-s95f.onrender.com/api/v1",
        description: "Production server",
      },
    ],
    paths: {
      ...userSwagger,
    },
    tags: [
      {
        name: "User",
        description:
          "APIs related to user operations (e.g., registration, login, get-user)",
      },
      {
        name: "Chat",
        description: "APIs related to Chat",
      },
      {
        name: "Message",
        description: "APIs related to Message",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: [],
};

export default swaggerOptions;
