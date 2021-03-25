const breakpoints = {
  medium: 641,
  large: 1008,
};

export default {
  spacing: {
    tiny: 4,
    small: 8,
    medium: 16,
    large: 32,
  },
  breakpoints,
  responsive: {
    mediumAndAbove: `@media only screen and (min-width: ${breakpoints.medium}px)`,
    largeAndAbove: `@media only screen and (min-width: ${breakpoints.large}px)`,
  },
  palette: {
    white: "#FFF",
    black: "#000",

    gray1: "#111",
    gray2: "#222",
    gray3: "#333",
    gray4: "#444",
    gray5: "#555",
    gray6: "#666",
    gray7: "#777",
    gray8: "#888",
    gray9: "#999",
    gray10: "#AAA",
    gray11: "#BBB",
    gray12: "#CCC",
    gray13: "#DDD",
    gray14: "#EEE",
  },
};
