const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: ".2rem",
    },
    extend: {
      fontFamily: {
        bebasneue: ["Bebas Neue", ...defaultTheme.fontFamily.sans],
        roboto: ["Roboto", ...defaultTheme.fontFamily.sans],
        sans: ['"Roboto"'],
      },
      colors: {
        dark: "#141414",
        black: "#000000",
        gray: "#333333",
        "light-gray": "#8C8C8C",
        red: "#e50914",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
  corePlugins: {
    preflight: true,
  },
};
