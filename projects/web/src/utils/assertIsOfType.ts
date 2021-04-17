export default function assertIsOfType<T>(
  value: any,
  predicate: (value: NonNullable<T>) => boolean
): value is T {
  if (value == null) {
    return false;
  }

  return predicate(value);
}
