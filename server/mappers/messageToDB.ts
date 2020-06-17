import { Event } from '../models/event';
import { Device } from '../models/device';
import { Climate } from '../models/climate';
import { Consumption } from '../models/consumption';

export default {
  onEnd: async () => {
    // console.log('onEnd 1');
  },
  map: async ({ topic, json }: { topic: string; json: Record<string, any> }) => {
    if (json.device?.ieeeAddr) {
      const {
        device: { ieeeAddr },
      } = json;
      const device = await Device.findOne({ where: { ieeeAddr }, attributes: ['id'] });
      let deviceId: number;
      if (!device) {
        console.log('no device, adding');
        ({ id: deviceId } = await new Device(json.device).save());
      } else {
        deviceId = device.id;
      }
      if (json.linkquality) {
        const { id: eventId } = await new Event({
          ...json,
          deviceId,
          topic,
          last_seen: new Date(json.last_seen),
          // last_seen: null,
        }).save();
        if (json.humidity && json.temperature) {
          await new Climate({ ...json, eventId }).save();
        }
        if (json.consumption) {
          await new Consumption({ ...json, eventId }).save();
        }
      }
    }
  },
};
