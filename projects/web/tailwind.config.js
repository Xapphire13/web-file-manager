const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.ts", "./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        inherit: "inherit",
        gray: colors.gray,
      },
      screens: {
        "hover-hover": { raw: "(hover: hover)" },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["odd", "even"],
      filter: ["hover"],
      brightness: ["hover"],
      borderWidth: ["last"],
    },
  },
  plugins: [],
};
