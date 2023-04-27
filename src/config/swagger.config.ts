import { Options } from "swagger-jsdoc";
import {} from "swagger-ui-express";

import { version } from "../../package.json";

export const swaggerOptions: Options = {
  swaggerDefinition: {
    info: {
      title: "REST API",
      version: version,
      description: "API Documentation for the application",
    },
  },
  apis: ["../../swagger.yaml"],
};
