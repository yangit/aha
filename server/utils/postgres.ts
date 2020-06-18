import { Sequelize } from 'sequelize';
import config from './config';
import { log, error } from './logger';
import { MessageInit } from '../models/message';
import { ClimateInit, Climate } from '../models/climate';
import { DeviceInit, Device } from '../models/device';
import { EventInit, Event } from '../models/event';
import { ConsumptionInit, Consumption } from '../models/consumption';
import { DeviceModelInit, DeviceModel } from '../models/deviceModel';
import { LocationInit, Location } from '../models/location';
import { OccupancyInit, Occupancy } from '../models/occupancy';
import seedDb from './seedDb';

export default async () => {
  const pgurl = `postgres://${config.get('POSTGRES_USER')}:${config.get('POSTGRES_PASSWORD')}@${config.get(
    'POSTGRES_HOST',
  )}:${config.get('POSTGRES_PORT')}/${config.get('POSTGRES_DB')}`;
  log(pgurl);
  const sequelize = new Sequelize(pgurl, {
    logging: false,
  });

  sequelize
    .authenticate()
    .then(() => {
      log('> Connected to postgresdb!');
    })
    .catch(err => {
      error('> Error connecting to postgresdb', err);

      process.exit();
    });
  MessageInit(sequelize);
  DeviceModelInit(sequelize);
  LocationInit(sequelize);
  DeviceInit(sequelize);
  EventInit(sequelize);
  ClimateInit(sequelize);
  ConsumptionInit(sequelize);
  OccupancyInit(sequelize);
  Device.belongsTo(DeviceModel, {
    foreignKey: {
      name: 'modelId',
      allowNull: false,
    },
  });
  Device.belongsTo(Location, {
    foreignKey: {
      name: 'locationId',
      allowNull: false,
    },
  });
  Event.belongsTo(Device, {
    foreignKey: {
      name: 'deviceId',
      allowNull: false,
    },
  });
  Climate.belongsTo(Event, {
    foreignKey: {
      name: 'eventId',
      allowNull: false,
    },
  });
  Consumption.belongsTo(Event, {
    foreignKey: {
      name: 'eventId',
      allowNull: false,
    },
  });
  Occupancy.belongsTo(Event, {
    foreignKey: {
      name: 'eventId',
      allowNull: false,
    },
  });
  await seedDb();

  await sequelize.sync();
  return sequelize;
};
