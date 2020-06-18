import { Event } from '../models/event';
import { Device } from '../models/device';
import { DeviceModel } from '../models/deviceModel';
import { Climate } from '../models/climate';
import { Consumption } from '../models/consumption';
// import { Location } from '../models/location';
import { Occupancy } from '../models/occupancy';
import { Click } from '../models/click';
import seedDb from '../utils/seedDb';
import { isClimate, isConsumption, isClick, isOccupancy, isAction } from '../utils/typeGuard';

export default {
  onStart: async () => {
    await Climate.drop();
    await Click.drop();
    await Consumption.drop();
    await Occupancy.drop();
    await Event.drop();
    // await Device.drop();
    // await DeviceModel.drop();
    // await Location.drop();
    console.log('Models dropped');

    // await DeviceModel.sync();
    // await Location.sync();
    // await Device.sync();
    await Event.sync();
    await Climate.sync();
    await Consumption.sync();
    await Occupancy.sync();
    await Click.sync();
    console.log('Models synced');

    await seedDb();
  },
  onEnd: async () => {},
  map: async ({
    topic,
    json,
    createdAt = new Date(),
  }: {
    topic: string;
    json: Record<string, any>;
    createdAt?: Date;
  }) => {
    if (json.device?.ieeeAddr && json.device?.model) {
      const {
        device: { ieeeAddr },
      } = json;
      // console.log(json);
      const device = await Device.findOne({ where: { ieeeAddr }, attributes: ['id'] });
      let deviceId: number;
      if (!device) {
        console.log('new device, adding');
        const deviceModel = await DeviceModel.findOne({ where: { id: json.device.model }, attributes: ['id'] });
        let modelId: string;
        if (!deviceModel) {
          console.log('new model, adding');
          ({ id: modelId } = await new DeviceModel({ id: json.device.model, createdAt }).save());
        } else {
          modelId = deviceModel.id;
        }

        ({ id: deviceId } = await new Device({ ...json.device, modelId, locationId: 1, createdAt }).save());
      } else {
        deviceId = device.id;
      }
      if (json.linkquality) {
        const { id: eventId } = await new Event({
          ...json,
          deviceId,
          topic,
          last_seen: new Date(json.last_seen),
          createdAt,
          isAction: isAction(json),
        }).save();

        if (isClimate(json)) {
          await new Climate({ ...json, eventId, createdAt }).save();
          return;
        }
        if (isConsumption(json)) {
          await new Consumption({ ...json, eventId, createdAt }).save();
          return;
        }
        if (isOccupancy(json)) {
          await new Occupancy({ ...json, eventId, createdAt }).save();
          return;
        }
        if (isClick(json)) {
          await new Click({ ...json, eventId, createdAt }).save();
          return;
        }
        if (json.device?.model === 'WXKG11LM') {
          // just keep-alive from click device
          return;
        }
        console.log('Unknown type', topic, json);
      }
    }
  },
};
