import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import ChildrenController from '@/controllers/children.controller';
import { CreateChildDto } from '@/dtos/children.dto';
import { authParentMiddleware } from '@/middlewares/auth.middleware';

class ParentRoute implements Routes {
  public path = '/children';
  public router = Router();
  public childrenController = new ChildrenController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authParentMiddleware(), this.childrenController.get);
    this.router.get(`${this.path}/:id(\\d+)`, authParentMiddleware(), this.childrenController.getById);
    this.router.post(`${this.path}`, authParentMiddleware(), validationMiddleware(CreateChildDto, 'body'), this.childrenController.create);
    this.router.put(
      `${this.path}/:id(\\d+)`,
      authParentMiddleware(),
      validationMiddleware(CreateChildDto, 'body', true),
      this.childrenController.update,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, authParentMiddleware(), this.childrenController.delete);
  }
}

export default ParentRoute;
