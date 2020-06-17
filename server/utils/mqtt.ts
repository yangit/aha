import mqtt from 'mqtt';
import { Message } from '../models/message';
import config from './config';

const masterTopic = config.get('MQTT_MASTER_TOPIC');
const mqttServer = config.get('MQTT_URL');
export default () => {
  console.log(`Connecting mqtt ${mqttServer}`);
  const client = mqtt.connect(mqttServer);

  client.on('connect', () => {
    client.subscribe(masterTopic, err => {
      if (err) {
        console.log(err);
      }
      console.log(`Subscribed to ${masterTopic}`);
    });
  });

  client.on('message', async (topic, message) => {
    // message is Buffer
    console.log(topic, message.toString());
    await new Message({ topic, json: message.toString() }).save();
    console.log(topic, message.toString());
  });
};
