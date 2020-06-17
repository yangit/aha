import fs from 'fs';

export default fs.readFileSync('./version').toString('utf8');
