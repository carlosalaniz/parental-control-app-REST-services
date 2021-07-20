import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateParentDto, LoginResquestParentDto } from '@/dtos/parents.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(CreateParentDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}authenticate`, validationMiddleware(LoginResquestParentDto, 'body'), this.authController.logIn);
  }
}

export default AuthRoute;
