import { Router } from "express";

import { IRoutes } from "../utils/interfaces/routes.interface";
import { UsersController } from "../modules/user/users.controller";

export class UsersRoute implements IRoutes {
  public path = "/users";
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, this.usersController.Create);
  }
}
