import { Model, DataTypes } from 'sequelize';

export class Climate extends Model {
  public eventId!: number;

  public humidity!: number;

  public temperature!: number;
}

export const ClimateInit = (sequelize: any) => {
  Climate.init(
    {
      // eventId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
      humidity: { type: DataTypes.DECIMAL, allowNull: false },
      temperature: { type: DataTypes.DECIMAL, allowNull: false },
    },
    { sequelize, tableName: 'climate' },
  );
};
