import './utils/init';
import getApp from './express/index';
import postgres from './utils/postgres';
import startMqtt from './utils/mqtt';

const port = 80;
const main = async (): Promise<void> => {
  await postgres.sequelize.sync();

  const { server } = getApp();
  startMqtt();
  server.listen({ port }, (): void => {
    console.log(`Express server listening for HTTP on ${port}`);
  });
};

main();
