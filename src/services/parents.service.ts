import bcrypt from 'bcrypt';
import DB from '@databases';
import { CreateParentDto } from '@/dtos/parents.dto';
import { HttpException } from '@exceptions/HttpException';
import { Parent } from '@/interfaces/parents.interface';
import { isEmpty } from '@utils/util';

class UserService {
  public users = DB.Parents;

  public async findAllUser(): Promise<Parent[]> {
    const allUser: Parent[] = await this.users.findAll();
    return allUser;
  }

  public async findUserById(userId: number): Promise<Parent> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: Parent = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateParentDto): Promise<Parent> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: Parent = await this.users.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: Parent = await this.users.create({ ...userData, password: hashedPassword });
    return createUserData;
  }

  public async updateUser(userId: number, userData: CreateParentDto): Promise<Parent> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: Parent = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    await this.users.update({ ...userData, password: hashedPassword }, { where: { id: userId } });

    const updateUser: Parent = await this.users.findByPk(userId);
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<Parent> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: Parent = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    await this.users.destroy({ where: { id: userId } });

    return findUser;
  }
}

export default UserService;
