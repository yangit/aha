import { Model } from 'sequelize';

export class Message extends Model {
  public id!: number;

  public topic!: string;

  public json!: Record<string, any>;

  public readonly createdAt!: Date;
}
