import { Model } from 'sequelize';
import { DocumentType } from '@typegoose/typegoose';
export const flattenObject = async function <T extends Model>(obj: T, attributeName: string) {
  obj = obj.get({ plain: true });
  for (const key in obj[attributeName]) {
    obj[key] = obj[attributeName][key];
    if (obj[key].then) {
      obj[key] = await obj[key];
    }
  }
  delete obj[attributeName];
  return obj as T;
};
export type TransactionModels = (Model | DocumentType<Object>)[];
export const RollBackCreateModels = async function (models: TransactionModels) {
  while (models.length > 0) {
    const model = models.pop();
    if (model instanceof Model) {
      await model.destroy();
    } else {
      await model.remove();
    }
  }
  return true;
};
