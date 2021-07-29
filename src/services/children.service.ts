import DB from '@databases';
import CRUDService from './basecrud.service';
import { Child } from '@/interfaces/children.interface';
import { CreateChildDto } from '@/dtos/children.dto';

class ChildrenService extends CRUDService<Child, CreateChildDto> {
  public model = DB.Children;
  public createDataType = 'CreateChildDto';
  public async findAll(parent_id?: number): Promise<Child[]> {
    if (parent_id != null) {
      const all: Child[] = await this.model.findAll({
        where: {
          parent_id: parent_id,
        },
      });
      return all;
    }
    return super.findAll();
  }
  public async findById(childId: number, parentId?: number) {
    if (parentId) {
      return await this.model.findOne({
        where: {
          parent_id: parentId,
          id: childId,
        },
      });
    }
    return super.findById(childId);
  }
}

export default ChildrenService;
