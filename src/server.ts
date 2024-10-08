import express from "express";
import { config } from "dotenv";
import rootRouter from "./routers/root.routers";
import { API_RESPONSES } from "./utils/api.response";
// import { trackClientInfo } from "./middlewares/track.user.middleware";
import morgan from "morgan";
import databaseConnection from "./configs/db-config";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./configs/swaggerConfig";
import cors from "cors";

// Custom CSS styles as a string
const customCss = `
  .swagger-ui .topbar {
      display: none; /* Hide the header */
  }
  .swagger-ui .opblock-tag {
      font-size: 1.2em; /* Change font size of operation tags */
      font-weight: bold; /* Make operation tags bold */
      font-style: italic; /*
  }
  .swagger-ui .opblock {
      border: 1px solid #ddd; /* Change border color of operations */
      border-radius: 3px; /* Rounded corners */
  }
`;

const swaggerOption = {
  customCss,
  swaggerOptions: {
    // Change the UI settings
    docExpansion: "none", // Options: 'none', 'full', 'list'
    defaultModelsExpandDepth: -1, // To hide models section
    tagsSorter: "alpha", // Sort tags alphabetically
    operationsSorter: "alpha", // Sort operations alphabetically
  },
};

config();
const APP_PORT = process.env.APP_PORT || 8000;
const app = express();

app.use(express.json());
// app.use(trackClientInfo);
app.use(morgan("combined"));
app.use(cors());

app.use("/api/v1", rootRouter);

// Initialize swagger-jsdoc and swagger-ui
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, swaggerOption)
);

// if some path is not specified then
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json(API_RESPONSES.notFound());
});

app.listen(APP_PORT, () => {
  console.log(`Server is running on http://localhost:${APP_PORT}`);
  databaseConnection();
});
