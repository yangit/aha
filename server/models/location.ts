import { Model, DataTypes } from 'sequelize';

export class Location extends Model {
  public id!: number;

  public name: string;

  public readonly createdAt!: Date;
}

export const LocationInit = (sequelize: any) => {
  Location.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: true },
    },
    { sequelize, tableName: 'location' },
  );
};
