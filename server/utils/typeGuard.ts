export const isClimate = (json: Record<string, any>) =>
  typeof json.humidity !== 'undefined' && typeof json.temperature !== 'undefined';
export const isConsumption = (json: Record<string, any>) => typeof json.consumption !== 'undefined';
export const isClick = (json: Record<string, any>) => typeof json.click !== 'undefined';
export const isOccupancy = (json: Record<string, any>) => typeof json.occupancy !== 'undefined';

export const isAction = (json: Record<string, any>) => {
  return isClick(json) || isOccupancy(json);
  // return isClimate(json) || isConsumption(json) || isClick(json) || isOccupancy(json);
};
