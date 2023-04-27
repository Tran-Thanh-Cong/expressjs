import { Router } from "express";

import { AuthController } from "./../modules/auth/auth.controller";
import { IRoutes } from "../utils/interfaces/routes.interface";

export class AuthRoute implements IRoutes {
  public path = "/auth";
  public router = Router();

  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}`, this.authController.Register);
  }
}
