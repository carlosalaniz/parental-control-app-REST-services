import bcrypt from 'bcrypt';
import DB from '@databases';
import { CreateParentDto } from '@/dtos/parents.dto';
import { HttpException } from '@exceptions/HttpException';
import { Parent } from '@/interfaces/parents.interface';
import { isEmpty } from '@utils/util';

class UserService {
  public parents = DB.Parents;

  public async findAllParent(): Promise<Parent[]> {
    const allUser: Parent[] = await this.parents.findAll();
    return allUser;
  }

  public async findParentById(userId: number): Promise<Parent> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not parentId");

    const findUser: Parent = await this.parents.findByPk(userId);
    if (!findUser) throw new HttpException(409, "You're not parent");

    return findUser;
  }

  public async createParent(parentData: CreateParentDto): Promise<Parent> {
    if (isEmpty(parentData)) throw new HttpException(400, "You're not parentData");

    const findUser: Parent = await this.parents.findOne({ where: { email: parentData.email } });
    if (findUser) throw new HttpException(409, `You're email ${parentData.email} already exists`);

    const hashedPassword = await bcrypt.hash(parentData.password, 10);
    const createUserData: Parent = await this.parents.create({ ...parentData, password: hashedPassword });
    return createUserData;
  }

  public async updateParent(parentId: number, parentData: CreateParentDto): Promise<Parent> {
    if (isEmpty(parentData)) throw new HttpException(400, "You're not parentData");

    const findUser: Parent = await this.parents.findByPk(parentId);
    if (!findUser) throw new HttpException(409, "You're not parent");

    const hashedPassword = await bcrypt.hash(parentData.password, 10);
    await this.parents.update({ ...parentData, password: hashedPassword }, { where: { id: parentId } });

    const updateUser: Parent = await this.parents.findByPk(parentId);
    return updateUser;
  }

  public async deleteParent(parentId: number): Promise<Parent> {
    if (isEmpty(parentId)) throw new HttpException(400, "You're not parentId");

    const findParent: Parent = await this.parents.findByPk(parentId);
    if (!findParent) throw new HttpException(409, "You're not parent");

    await this.parents.destroy({ where: { id: parentId } });

    return findParent;
  }
}

export default UserService;
