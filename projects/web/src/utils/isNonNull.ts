export default function isNonNull<T>(value: T | null | undefined): value is T {
  return !!value;
}
