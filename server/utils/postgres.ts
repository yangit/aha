import { Sequelize, DataTypes } from 'sequelize';
import config from './config';
import { log, error } from './logger';
import { Message } from '../models/message';

const isDev = config.get('NODE_ENV') === 'development';
const pgurl = `postgres://${config.get('POSTGRES_USER')}:${config.get('POSTGRES_PASSWORD')}@${config.get(
  'POSTGRES_HOST',
)}:${config.get('POSTGRES_PORT')}/${config.get('POSTGRES_DB')}`;
log(pgurl);
const sequelize = new Sequelize(pgurl, { logging: false });

/**
 * Check connection to our pg first.
 */
sequelize
  .authenticate()
  .then(() => {
    log('> Connected to postgresdb!');
  })
  .catch(err => {
    error('> Error connecting to postgresdb', err);

    if (!isDev) {
      process.exit();
    }
  });

Message.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    topic: { type: DataTypes.STRING, allowNull: false },
    json: { type: DataTypes.JSON, allowNull: false },
  },
  { sequelize, tableName: 'message' },
);

// eslint-disable-next-line
sequelize.models.Message;

export default { sequelize, Message };
