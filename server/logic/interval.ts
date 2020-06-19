import { MqttClient } from 'mqtt';

// const topic = 'zigbee2mqtt/0x00158d0003a035e5/get';
// const topic = 'zigbee2mqtt/0x00158d0001f2ac03/get';
export default async (client: MqttClient) => {
  const topic = 'zigbee2mqtt/0x00158d0003a035e5/get';
  const value = JSON.stringify({ state: '' });
  client.publish(topic, value, (...rest) => {
    console.log(topic, rest);
  });

  const topic2 = 'zigbee2mqtt/0x00158d0001f2ac03/get';
  const value2 = JSON.stringify({ temperature: '', humidity: '' });

  console.log({ value2 });
  client.publish(topic2, value2, (...rest) => {
    console.log(topic2, rest);
  });
};
