export default function useMediaQuery(mediaQuery: string) {
  const mql = window.matchMedia(mediaQuery);

  return mql.matches;
}
