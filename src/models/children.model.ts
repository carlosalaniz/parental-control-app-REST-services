import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Child } from '@/interfaces/children.interface';
import { ParentModel } from './parents.model';

export type ChildCreationAttributes = Optional<Child, 'id' | 'parent_id'>;

export class ChildModel extends Model<Child, ChildCreationAttributes> implements Child {
  id: number;
  parent_id: number;
  name: string;
  birth_date: Date;
  gender: number;
  phone_number: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ChildModel {
  ChildModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: ParentModel,
          key: 'id',
        },
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      birth_date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      gender: {
        allowNull: false,
        type: DataTypes.TINYINT,
      },
      phone_number: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(50),
      },
    },
    {
      tableName: 'children',
      sequelize,
    },
  );
  return ChildModel;
}
