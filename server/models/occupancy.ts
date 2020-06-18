import { Model, DataTypes } from 'sequelize';

export class Occupancy extends Model {
  public eventId!: number;

  public occupancy!: boolean;
}

export const OccupancyInit = (sequelize: any) => {
  Occupancy.init(
    {
      occupancy: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    { sequelize, tableName: 'occupancy' },
  );
};
