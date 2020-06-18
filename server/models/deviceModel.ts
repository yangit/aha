import { Model, DataTypes } from 'sequelize';

export class DeviceModel extends Model {
  public id!: string;

  public name: string;

  public readonly createdAt!: Date;
}

export const DeviceModelInit = (sequelize: any) => {
  DeviceModel.init(
    {
      id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
      name: { type: DataTypes.STRING },
    },
    { sequelize, tableName: 'deviceModel' },
  );
};
