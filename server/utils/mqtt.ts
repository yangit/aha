import mqtt from 'mqtt';
import { Message } from '../models/message';
import config from './config';
import messageToDB from '../mappers/messageToDB';

const masterTopic = config.get('MQTT_MASTER_TOPIC');
const mqttServer = config.get('MQTT_URL');
export default async () => {
  console.log(`Connecting mqtt ${mqttServer}`);
  const client = mqtt.connect(mqttServer);

  await new Promise(resolve => {
    client.on('connect', () => {
      resolve();
    });
  });
  console.log('Mqtt connected');
  await new Promise((resolve, reject) => {
    client.subscribe(masterTopic, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
  console.log(`Mqtt subscribed to ${masterTopic}`);
  client.on('message', async (topic, buffer) => {
    const json = (string => {
      try {
        return JSON.parse(string);
      } catch (err) {
        return `"${string}"`;
      }
    })(buffer.toString());
    await new Message({ topic, json }).save();
    await messageToDB.map({ topic, json });
  });
};
