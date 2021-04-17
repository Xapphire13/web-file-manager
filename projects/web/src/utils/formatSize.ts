import { roundToDecimalPlaces } from "./roundToDecimalPlaces";

const KiB = 1000;
const MiB = 1000 * KiB;
const GiB = 1000 * MiB;

export default function formatSize(size: number) {
  if (size < KiB) {
    const rounded = roundToDecimalPlaces(size, 1);

    return `${rounded} ${rounded === 1 ? "byte" : "bytes"}`;
  } else if (size < MiB) {
    return `${roundToDecimalPlaces(size / KiB, 1)} KiB`;
  } else if (size < GiB) {
    return `${roundToDecimalPlaces(size / MiB, 1)} MiB`;
  }

  return `${roundToDecimalPlaces(size / GiB, 1)} GiB`;
}
