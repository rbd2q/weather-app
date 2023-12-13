const directions = [
  'северный',
  'северо-западный',
  'восточный',
  'юго-восточный',
  'южный',
  'юго-западный',
  'западный',
  'северо-западный'
];

export const convertDegreesToDirection = (degrees: number): string => {
  const index = Math.round(degrees / 8 / 5.625);
  return directions[index];
};
