import { log, error } from './logger';
import './axiosInterceptors';

console.log('\n\n\n');
const createHandler = (name: string): ((err: Error | {} | null | undefined, promise?: Promise<any>) => void) => (
  err: Error | {} | null | undefined,
  promise?: Promise<any>,
): void => {
  error(`> Error in createHandler ${name}`, err);
  if (promise) {
    log(`> Promise in createHandler ${name}`, promise);
  }
};

process.on('unhandledRejection', createHandler('unhandledRejection'));
process.on('uncaughtException', createHandler('uncaughtException'));
