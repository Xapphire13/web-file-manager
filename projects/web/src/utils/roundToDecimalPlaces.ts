export function roundToDecimalPlaces(value: number, decimalPlaces: number) {
  const mult = Math.pow(10, decimalPlaces);

  return Math.floor(value * mult) / mult;
}
