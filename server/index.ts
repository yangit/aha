import getApp from './express/index';
import postgres from './utils/postgres';

const port = 80;
const main = async (): Promise<void> => {
  await postgres.sequelize.sync();

  const { server } = getApp();

  server.listen({ port }, (): void => {
    success(`Express server listening for HTTP on ${port}`);
  });
};

main();
