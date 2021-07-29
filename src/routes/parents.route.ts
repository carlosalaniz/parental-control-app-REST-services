import { Router } from 'express';
import ParentsController from '@/controllers/parents.controller';
import { CreateParentDto } from '@/dtos/parents.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
class ParentRoute implements Routes {
  public path = '/parents';
  public router = Router();
  public parentsController = new ParentsController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.parentsController.get);
    this.router.get(`${this.path}/:id(\\d+)`, this.parentsController.getById);
    this.router.post(`${this.path}`, validationMiddleware(CreateParentDto, 'body'), this.parentsController.create);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateParentDto, 'body', true), this.parentsController.update);
    this.router.delete(`${this.path}/:id(\\d+)`, this.parentsController.delete);
  }
}

export default ParentRoute;
