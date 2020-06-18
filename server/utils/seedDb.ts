import { Location } from '../models/location';

export default async () => {
  const defaultLocation = await Location.findByPk(1);
  if (!defaultLocation) {
    console.log('added deafult location');
    await new Location({ name: 'default' }).save();
  }
  console.log('DB seeded');
};
