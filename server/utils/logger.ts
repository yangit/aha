import moment from 'moment-timezone';
import chalk from 'chalk';

const chalkSuccess = chalk.green;
const chalkError = chalk.bold.red;
const chalkWarning = chalk.keyword('orange');

const TIMEZONE = 'Asia/Jakarta';

export function log(e: any, obj?: any): void {
  const date = moment.tz(new Date(), TIMEZONE).format('YYYY-MM-DD HH:mm:ss');
  if (obj) console.log(`${date} `, e, obj);
  else console.log(`${date} `, e);
}

export function success(e: any, obj?: any): void {
  const date = moment.tz(new Date(), TIMEZONE).format('YYYY-MM-DD HH:mm:ss');
  if (obj) console.log(`${date} `, chalkSuccess(e), obj);
  else console.log(`${date} `, chalkSuccess(e));
}

export function warn(e: any, obj?: any): void {
  const date = moment.tz(new Date(), TIMEZONE).format('YYYY-MM-DD HH:mm:ss');
  if (obj) console.warn(`${date} `, chalkWarning(e), obj);
  else console.warn(`${date} `, chalkWarning(e));
}

export function error(e: any, obj?: any): void {
  const date = moment.tz(new Date(), TIMEZONE).format('YYYY-MM-DD HH:mm:ss');
  if (obj) console.error(`${date} `, chalkError(e), obj);
  else console.error(`${date} `, chalkError(e));
}
