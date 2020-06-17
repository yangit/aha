import express, { Application } from 'express';
import bodyParser from 'body-parser';
import http2, { Http2Server } from 'http2';
// import config from '../utils/config';
import health from './health';

export default (): { app: Application; server: Http2Server } => {
  const app = express();
  app.use(bodyParser.text());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/health', health);
  const server = http2.createServer(app);
  return { app, server };
};
