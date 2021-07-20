import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import DB from '@databases';
import { CreateParentDto } from '@/dtos/parents.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { Parent } from '@/interfaces/parents.interface';
import { isEmpty } from '@utils/util';
import { Child } from '@/interfaces/children.interface';

class AuthService {
  public users = DB.Parents;

  public async signup(parentData: CreateParentDto): Promise<{ token: string; parent: Parent }> {
    if (isEmpty(parentData)) throw new HttpException(400, "You're not userData");

    const findUser: Parent = await this.users.findOne({ where: { email: parentData.email } });
    if (findUser) throw new HttpException(409, `You're email ${parentData.email} already exists`);

    const hashedPassword = await bcrypt.hash(parentData.password, 10);
    const createParentData: Parent = await this.users.create({ ...parentData, password: hashedPassword });

    const tokenData = this.createParentToken(createParentData);
    return { token: tokenData.token, parent: createParentData };
  }

  public async authenticate(userData: CreateParentDto): Promise<{ token: string; findUser: Parent }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: Parent = await this.users.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createParentToken(findUser);

    return { token: tokenData.token, findUser };
  }

  public createParentToken(parent: Parent): TokenData {
    const dataStoredInToken: DataStoredInToken = {
      id: parent.id,
      type: 'Parent',
    };
    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 60 * 60; // in seconds or, a string with d,h,m for example 1h
    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
  }
}

export default AuthService;
