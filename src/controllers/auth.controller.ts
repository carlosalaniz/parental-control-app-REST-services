import { NextFunction, Request, Response } from 'express';
import { CreateParentDto } from '@/dtos/parents.dto';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateParentDto = req.body;
      const signUpUserData = await this.authService.signup(userData);
      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateParentDto = req.body;
      const { token, findUser } = await this.authService.authenticate(userData);
      res.status(200).json({ data: { token, findUser }, message: 'authenticate' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
