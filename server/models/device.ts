import { Model, DataTypes } from 'sequelize';

export class Device extends Model {
  public id!: number;

  public friendlyName: string;

  public ieeeAddr: string;

  public name: string;

  public model: string;

  public readonly createdAt!: Date;
}

export const DeviceInit = (sequelize: any) => {
  Device.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      friendlyName: { type: DataTypes.STRING, allowNull: false },
      ieeeAddr: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: true },
      model: { type: DataTypes.STRING },
    },
    { sequelize, tableName: 'device' },
  );
};