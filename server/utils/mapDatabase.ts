// define your mapper in './mappers/YOUR_MAPPER.ts'
// declare your mapper in './mappers/index.ts'
// Make sure it conforms to typescript API defined there.
// If it does it will work with mapDatabase script.
// Notice the last parameter passed in command line to mapDatabase script is a name of the mapper to be used.
// That ensures reusability of the mapDatabase across different mappers
// API limits you to process one document at a time. That is by design, becasuse we may have huge database, where loading all documents in memory is not an option.
// PROD
// POSTGRES_USER=aha POSTGRES_PASSWORD=ahapassword POSTGRES_DB=aha POSTGRES_HOST=192.168.2.50 POSTGRES_PORT=6602 SKIP_CONFIG_CHECK=true npx --no-install tsnd ./utils/mapDatabase.ts messageToDB
import './init';
import { Transform } from 'stream';
import moment from 'moment';
import { Client } from 'pg';
import QueryStream from 'pg-query-stream';
import postgres from './postgres';
import mappers from '../mappers';
import config from './config';

// pipe 1,000,000 rows to stdout without blowing up your memory usage

const mapperName = process.argv[2];
if (!mapperName) {
  throw new Error('Please specify the argument with which file to map the DB');
}
const processor = mappers[mapperName];
if (!processor) {
  throw new Error('Unknown mapper');
}
// eslint-disable-next-line import/no-dynamic-require

const { map, onEnd, onStart } = processor;
let interval: NodeJS.Timeout;
const main = async () => {
  await postgres();
  const client = new Client({
    user: config.get('POSTGRES_USER'),
    host: config.get('POSTGRES_HOST'),
    database: config.get('POSTGRES_DB'),
    password: config.get('POSTGRES_PASSWORD'),
    port: config.get('POSTGRES_PORT'),
  });

  await client.connect();
  const start = moment();
  const count = parseInt((await client.query('SELECT count(*) FROM message'))?.rows?.[0]?.count, 10);

  console.log({ count });

  const i = 0;
  interval = setInterval(() => {
    console.log(`${i}/${count}`);
  }, 2000);
  await onStart();
  const query = new QueryStream('SELECT * FROM message');
  await new Promise((resolve, reject) => {
    const stream = client.query(query);
    stream.on('end', resolve);
    stream.on('error', reject);
    stream.pipe(
      new Transform({
        writableObjectMode: true,
        transform: async (chunk, _encoding, callback) => {
          try {
            const data = await map(chunk);
            callback(null, data);
          } catch (err) {
            callback(err);
          }
        },
      }),
    );
  });
  await onEnd();
  clearInterval(interval);
  console.log(`Done: ${moment().diff(start, 'ms')}ms`);
};
main().catch(err => {
  clearInterval(interval);
  throw err;
});
