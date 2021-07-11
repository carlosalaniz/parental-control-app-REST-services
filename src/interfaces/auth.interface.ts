import { Request } from 'express';
import { Parent } from '@/interfaces/parents.interface';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: Parent;
}
