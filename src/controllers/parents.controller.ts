import { CreateParentDto } from '@/dtos/parents.dto';
import { Parent } from '@/interfaces/parents.interface';
import parentService from '@/services/parents.service';
import CRUDController from './crud.controller';

class ParentsController extends CRUDController<Parent, CreateParentDto> {
  public dbService = new parentService();
}

export default ParentsController;
