import { Event } from '../models/event';
import { Device } from '../models/device';
import { DeviceModel } from '../models/deviceModel';
import { Climate } from '../models/climate';
import { Consumption } from '../models/consumption';

export default {
  onStart: async () => {
    await Climate.drop();
    await Consumption.drop();
    await Event.drop();
    await Device.drop();
    await DeviceModel.drop();
    console.log('Models dropped');
    await DeviceModel.sync();
    await Device.sync();
    await Event.sync();
    await Climate.sync();
    await Consumption.sync();

    console.log('Models synced');
  },
  onEnd: async () => {},
  map: async ({ topic, json }: { topic: string; json: Record<string, any> }) => {
    if (json.device?.ieeeAddr && json.device?.model) {
      const {
        device: { ieeeAddr },
      } = json;

      const device = await Device.findOne({ where: { ieeeAddr }, attributes: ['id'] });
      let deviceId: number;
      if (!device) {
        console.log('new device, adding');
        const deviceModel = await DeviceModel.findOne({ where: { id: json.device.model }, attributes: ['id'] });
        let modelId: string;
        if (!deviceModel) {
          console.log('new model, adding');
          ({ id: modelId } = await new DeviceModel({ id: json.device.model }).save());
        } else {
          modelId = deviceModel.id;
        }

        ({ id: deviceId } = await new Device({ ...json.device, modelId }).save());
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
