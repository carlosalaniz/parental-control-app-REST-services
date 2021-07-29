import bcrypt from 'bcrypt';
import DB from '@databases';
import { CreateParentDto } from '@/dtos/parents.dto';
import { Parent } from '@/interfaces/parents.interface';
import CRUDService from './basecrud.service';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from '@/utils/util';

class ParentService extends CRUDService<Parent, CreateParentDto> {
  public model = DB.Parents;
  public createDataType = 'CreateParentDto';
  public async findAll() {
    const all: Parent[] = await this.model.findAll({ attributes: { exclude: ['password'] } });
    return all;
  }

  public async findById(recordId: number): Promise<Parent> {
    if (isEmpty(recordId)) throw new HttpException(400, "You're not parentId");

    const findOne: Parent = await this.model.findByPk(recordId, { attributes: { exclude: ['password'] } });
    if (!findOne) throw new HttpException(409, "You're not parent");

    return findOne;
  }

  public async create(parentData: CreateParentDto): Promise<Parent> {
    const hashedPassword = await bcrypt.hash(parentData.password, 10);
    return super.create({ ...parentData, password: hashedPassword });
  }

  public async update(parentId: number, parentData: CreateParentDto): Promise<Parent> {
    const hashedPassword = await bcrypt.hash(parentData.password, 10);
    return super.update(parentId, { ...parentData, password: hashedPassword });
  }
}

export default ParentService;
