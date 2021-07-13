import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Parent } from '@/interfaces/parents.interface';

export type ParentCreationAttributes = Optional<Parent, 'id' | 'email' | 'password'>;

export class ParentModel extends Model<Parent, ParentCreationAttributes> implements Parent {
  public full_name: string;
  public phone_numer: string;
  public address: string;
  public id: number;
  public email: string;
  public password: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ParentModel {
  ParentModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      full_name: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      phone_numer: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
    },
    {
      tableName: 'parents',
      sequelize,
    },
  );

  return ParentModel;
}
