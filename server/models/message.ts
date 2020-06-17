import { Model, DataTypes } from 'sequelize';

export class Message extends Model {
  public id!: number;

  public topic!: string;

  public json!: Record<string, any>;

  public readonly createdAt!: Date;
}

export const MessageInit = (sequelize: any) => {
  Message.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      topic: { type: DataTypes.STRING, allowNull: false },
      json: { type: DataTypes.JSONB, allowNull: false },
    },
    { sequelize, tableName: 'message' },
  );
};
