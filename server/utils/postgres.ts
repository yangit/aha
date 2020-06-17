import { Sequelize, DataTypes } from 'sequelize';
import config from './config';
import { log, error } from './logger';
import { Geoloc } from '../models/Geoloc';
import { Metadata } from '../models/postgres/Metadata';
import { NavTimingReportV2 } from '../models/postgres/NavTimingReportV2';

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

/**
 * Init geoloc models
 * PK automatically indexed on init
 */
Geoloc.init(
  {
    ip: { type: DataTypes.STRING, primaryKey: true, unique: true, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    continent: { type: DataTypes.STRING, allowNull: true },
    continentCode: { type: DataTypes.STRING, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: false },
    countryCode: { type: DataTypes.STRING, allowNull: true },
    region: { type: DataTypes.STRING, allowNull: true },
    regionName: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    district: { type: DataTypes.STRING, allowNull: true },
    zip: { type: DataTypes.STRING, allowNull: true },
    longitude: { type: DataTypes.FLOAT, allowNull: true },
    latitude: { type: DataTypes.FLOAT, allowNull: true },
    timezone: { type: DataTypes.STRING, allowNull: true },
    offset: { type: DataTypes.INTEGER, allowNull: true },
    currency: { type: DataTypes.STRING, allowNull: true },
    isp: { type: DataTypes.STRING, allowNull: true },
    org: { type: DataTypes.STRING, allowNull: true },
    as: { type: DataTypes.STRING, allowNull: true },
    asname: { type: DataTypes.STRING, allowNull: true },
    reverse: { type: DataTypes.STRING, allowNull: true },
    mobile: { type: DataTypes.BOOLEAN, allowNull: true },
    proxy: { type: DataTypes.BOOLEAN, allowNull: true },
    hosting: { type: DataTypes.BOOLEAN, allowNull: true },
    query: { type: DataTypes.STRING, allowNull: true },
  },
  { sequelize, tableName: 'tl_geoloc' },
);

/**
 * Init ApiV2 mdoels
 */
Metadata.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    ip: { type: DataTypes.STRING, allowNull: false },
    subnet: { type: DataTypes.STRING, allowNull: false },
    userAgent: { type: DataTypes.STRING, allowNull: false },
    userAgentFamily: { type: DataTypes.STRING, allowNull: true },
    userAgentDevice: { type: DataTypes.STRING, allowNull: true },
    userAgentOs: { type: DataTypes.STRING, allowNull: true },
    navTimingApiVersion: { type: DataTypes.STRING, allowNull: false },
    reportConsulIndex: { type: DataTypes.STRING, allowNull: false },
    liteAppVersion: { type: DataTypes.STRING, allowNull: false },
    clientTimingPackageVersion: { type: DataTypes.STRING, allowNull: false },
    href: { type: DataTypes.STRING, allowNull: false },
    page: { type: DataTypes.STRING, allowNull: false },
    isMobile: { type: DataTypes.BOOLEAN, allowNull: false },
    service: { type: DataTypes.STRING, allowNull: false },
    nodeEnv: { type: DataTypes.STRING, allowNull: false },
    hypnosVersion: { type: DataTypes.STRING, allowNull: false },
    serviceWorker: { type: DataTypes.BOOLEAN, allowNull: true },
    pageType: { type: DataTypes.STRING, allowNull: true },
  },
  { sequelize, tableName: 'general_metadata', indexes: [{ fields: ['createdAt'], using: 'BRIN' }] }
);

/**
 * Nav Timing Report v2
 * FK: id from general_metadata
 */
NavTimingReportV2.init(
  {
    name: { type: DataTypes.STRING, allowNull: true },
    entryType: { type: DataTypes.STRING, allowNull: true },
    startTime: { type: DataTypes.DECIMAL, allowNull: true },
    duration: { type: DataTypes.DECIMAL, allowNull: true },
    initiatorType: { type: DataTypes.STRING, allowNull: true },
    nextHopProtocol: { type: DataTypes.STRING, allowNull: true },
    workerStart: { type: DataTypes.DECIMAL, allowNull: true },
    redirectStart: { type: DataTypes.DECIMAL, allowNull: true },
    redirectEnd: { type: DataTypes.DECIMAL, allowNull: true },
    fetchStart: { type: DataTypes.DECIMAL, allowNull: true },
    domainLookupStart: { type: DataTypes.DECIMAL, allowNull: true },
    domainLookupEnd: { type: DataTypes.DECIMAL, allowNull: true },
    connectStart: { type: DataTypes.DECIMAL, allowNull: true },
    connectEnd: { type: DataTypes.DECIMAL, allowNull: true },
    secureConnectionStart: { type: DataTypes.DECIMAL, allowNull: true },
    requestStart: { type: DataTypes.DECIMAL, allowNull: true },
    responseStart: { type: DataTypes.DECIMAL, allowNull: true },
    responseEnd: { type: DataTypes.DECIMAL, allowNull: true },
    transferSize: { type: DataTypes.DECIMAL, allowNull: true },
    encodedBodySize: { type: DataTypes.DECIMAL, allowNull: true },
    unloadEventStart: { type: DataTypes.DECIMAL, allowNull: true },
    unloadEventEnd: { type: DataTypes.DECIMAL, allowNull: true },
    domInteractive: { type: DataTypes.DECIMAL, allowNull: true },
    domContentLoadedEventStart: { type: DataTypes.DECIMAL, allowNull: true },
    domContentLoadedEventEnd: { type: DataTypes.DECIMAL, allowNull: true },
    domComplete: { type: DataTypes.DECIMAL, allowNull: true },
    loadEventStart: { type: DataTypes.DECIMAL, allowNull: true },
    loadEventEnd: { type: DataTypes.DECIMAL, allowNull: true },
    type: { type: DataTypes.STRING, allowNull: true },
    redirectCount: { type: DataTypes.INTEGER, allowNull: true },
    metadata_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: 'api_v2_report' }
);

Metadata.hasOne(NavTimingReportV2, { foreignKey: 'metadata_id' });
NavTimingReportV2.belongsTo(Metadata, { foreignKey: 'metadata_id' });

sequelize.models.Geoloc;
sequelize.models.ApiV2;
sequelize.models.NavTimingReportV2;

export default { sequelize, Geoloc };
