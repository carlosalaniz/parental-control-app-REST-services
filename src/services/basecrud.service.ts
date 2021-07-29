import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Model } from 'sequelize';
type NonAbstract<T> = { [P in keyof T]: T[P] }; // "abstract" gets lost here
type Constructor<T> = new () => T;
type NonAbstractTypeOfModel<T> = Constructor<T> & NonAbstract<typeof Model>;

abstract class CRUDService<T, CreateT extends object> {
  abstract model: NonAbstractTypeOfModel<Model<any, any> & T>;
  abstract createDataType: string;
  public async findAll(): Promise<T[]> {
    const all: T[] = await this.model.findAll();
    return all;
  }

  public async findById(recordId: number): Promise<T> {
    if (isEmpty(recordId)) throw new HttpException(400, "You're not parentId");

    const findOne: T = await this.model.findByPk(recordId);
    if (!findOne) throw new HttpException(409, "You're not parent");

    return findOne;
  }

  public async create(createData: CreateT): Promise<T> {
    if (isEmpty(createData)) throw new HttpException(400, "You're not" + createData);
    try {
      const createModelData: T = await this.model.create(createData);
      return createModelData;
    } catch (e) {
      //todo: add better messages.
      throw new HttpException(409, e.fields || e.message);
    }
  }

  public async update(modelId: number, modelData: CreateT): Promise<T> {
    if (isEmpty(modelData)) throw new HttpException(400, "You're not" + this.createDataType);

    const findModel: T = await this.model.findByPk(modelId);
    if (!findModel) throw new HttpException(409, "You're not" + this.createDataType);

    await this.model.update(modelData, { where: { id: modelId } });

    const updateModel: T = await this.model.findByPk(modelId);
    return updateModel;
  }

  public async delete(modelId: number): Promise<T> {
    if (isEmpty(modelId)) throw new HttpException(400, "You're not id");

    const findModel: T = await this.model.findByPk(modelId);
    if (!findModel) throw new HttpException(409, "You're not parent");

    await this.model.destroy({ where: { id: modelId } });

    return findModel;
  }
}

export default CRUDService;
