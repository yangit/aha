import { Model, DataTypes } from 'sequelize';

export class Device extends Model {
  public id!: number;

  public type: string;

  public powerSource: string;

  public ieeeAddr: string;

  public name: string;

  public modelId: string;

  public locationId: number;

  public readonly createdAt!: Date;
}

export const DeviceInit = (sequelize: any) => {
  Device.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
      powerSource: { type: DataTypes.STRING, allowNull: false },
      ieeeAddr: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: true },
    },
    { sequelize, tableName: 'device' },
  );
};
