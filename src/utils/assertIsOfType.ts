export default function assertIsOfType<T>(
  value: any,
  predicate: (value: T) => boolean
): value is T {
  return predicate(value);
}
