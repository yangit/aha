import { MqttClient } from 'mqtt';

// const topic = 'zigbee2mqtt/0x00158d0003a035e5/get';
// const topic = 'zigbee2mqtt/0x00158d0001f2ac03/get';
export default async (client: MqttClient) => {
  const topic = 'zigbee2mqtt/0x00158d0003a035e5/get';
  const value = JSON.stringify({ state: '' });

  // const topic = 'zigbee2mqtt/0x00158d0001f2ac03/get';
  // const value = JSON.stringify({ temperature: '', humidity: '' });
  // const value = JSON.stringify({ battery: '' });
  // eslint-disable-next-line
  // const value = '{\"humidity\":\"\"}';

  // const topic = 'zigbee2mqtt/0x00158d0001f2ac03/get';

  //
  // const value = '{a:1}';
  console.log({ value });
  client.publish(
    topic,
    value,
    // JSON.stringify({
    //   temperature: '',
    // }),
    (...rest) => {
      console.log(topic, rest);
    },
  );
  //   console.log(result);
  //
};
