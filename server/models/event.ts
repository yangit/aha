import { Model, DataTypes } from 'sequelize';
// import * as t from 'io-ts';
// import { either } from 'fp-ts/lib/Either';

// const User = t.type({
//   userId: t.number,
//   name: t.string,
// });

// either(User.decode({}), user => console.log(user));
export class Event extends Model {
  public id!: number;

  public deviceId!: number;

  public battery: number;

  public topic: string;

  public voltage: number;

  public elapsed?: number;

  public last_seen: Date;

  public linkquality: number;

  public readonly createdAt!: Date;
}

export const EventInit = (sequelize: any) => {
  Event.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      topic: { type: DataTypes.STRING, allowNull: false },
      battery: { type: DataTypes.INTEGER, allowNull: true },
      voltage: { type: DataTypes.INTEGER, allowNull: true },
      linkquality: { type: DataTypes.INTEGER, allowNull: false },
      last_seen: { type: DataTypes.DATE, allowNull: false },
      elapsed: { type: DataTypes.INTEGER, allowNull: true },
    },
    { sequelize, tableName: 'event' },
  );
};
