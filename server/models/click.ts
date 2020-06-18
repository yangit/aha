import { Model, DataTypes } from 'sequelize';

export class Click extends Model {
  public eventId!: number;

  public click!: string;
}

export const ClickInit = (sequelize: any) => {
  Click.init(
    {
      click: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, tableName: 'click' },
  );
};
