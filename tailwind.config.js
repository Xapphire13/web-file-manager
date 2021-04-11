const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.ts", "./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["odd", "even"],
    },
  },
  plugins: [],
};
