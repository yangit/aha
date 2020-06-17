import { Model, DataTypes } from 'sequelize';

export class Consumption extends Model {
  public eventId!: number;

  public power!: number;

  public state!: string;

  public temperature!: number;

  public consumption!: number;
}

export const ConsumptionInit = (sequelize: any) => {
  Consumption.init(
    {
      power: { type: DataTypes.DECIMAL, allowNull: false },
      state: { type: DataTypes.STRING, allowNull: false },
      temperature: { type: DataTypes.DECIMAL, allowNull: false },
      consumption: { type: DataTypes.DECIMAL, allowNull: false },
    },
    { sequelize, tableName: 'consumption' },
  );
};
