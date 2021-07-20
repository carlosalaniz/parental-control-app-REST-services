import { Router } from 'express';
import ParentsController from '@/controllers/parents.controller';
import { CreateParentDto } from '@/dtos/parents.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authParentMiddleware from '@/middlewares/auth.middleware';

class ParentRoute implements Routes {
  public path = '/parents';
  public router = Router();
  public parentsController = new ParentsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.parentsController.getParents);
    this.router.get(`${this.path}/:id(\\d+)`, this.parentsController.getParentById);
    this.router.post(`${this.path}`, validationMiddleware(CreateParentDto, 'body'), this.parentsController.createParent);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateParentDto, 'body', true), this.parentsController.updateParent);
    this.router.delete(`${this.path}/:id(\\d+)`, this.parentsController.deleteParent);
  }
}

export default ParentRoute;
