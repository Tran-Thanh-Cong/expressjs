import express, { Application, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import compression from "compression";
import swaggerJSDoc from "swagger-jsdoc";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { serve, setup } from "swagger-ui-express";

import { IRoutes } from "./utils/interfaces/routes.interface";
import { ErrorMiddleware } from "./middleware/error.middleware";
import { corsOptions } from "./config/cors.config";
import { NotFoundError } from "./utils/exceptions/http.exception";
import { swaggerOptions } from "./config/swagger.config";

export default class App {
  public express: Application;
  public port: number;

  constructor(routes: IRoutes[], port: number) {
    this.express = express();
    this.port = port;

    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
    this.initializeDatabaseConnection();
    this.initializeSwagger();
  }

  private initializeMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors(corsOptions));
    this.express.use(morgan("dev"));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  private initializeRoutes(routes: IRoutes[]): void {
    routes.forEach((route: IRoutes) => {
      this.express.use("/api", route.router);
    });
  }

  private initializeErrorHandling(): void {
    this.express.use((req: Request, res: Response, next: NextFunction) =>
      next(new NotFoundError(req.path))
    );
    this.express.use(ErrorMiddleware);
  }

  private initializeDatabaseConnection(): void {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

    mongoose
      .connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`)
      .then(() => {
        console.log("Connected to database successfully");
      })
      .catch((error) => {
        console.log(`Error connecting to database: ${error}`);
      });
  }

  private initializeSwagger(): void {
    const spec = swaggerJSDoc(swaggerOptions);
    this.express.use("/api-docs", serve, setup(spec));
  }

  public listten(): void {
    this.express.listen(this.port, () => {
      console.log(`http://localhost:${this.port}`);
    });
  }
}
