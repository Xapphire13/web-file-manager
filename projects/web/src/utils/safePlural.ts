export default function safePlural(
  num: number,
  singluar: string,
  plural: string
) {
  return num === 1 ? singluar : plural;
}
