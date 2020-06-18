import './utils/init';
import getApp from './express/index';
import postgres from './utils/postgres';
import startMqtt from './utils/mqtt';
import interval from './logic/interval';

const port = 80;
const main = async (): Promise<void> => {
  await postgres();
  const mqttClient = await startMqtt();
  await interval(mqttClient);
  const { server } = getApp();

  server.listen({ port }, (): void => {
    console.log(`Express server listening for HTTP on ${port}`);
  });
};

main();
