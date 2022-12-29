const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      fontFamily: {
        bebasneue: ["Bebas Neue", ...defaultTheme.fontFamily.sans],
        roboto: ["Roboto", ...defaultTheme.fontFamily.sans],
        sans: ['"Roboto"'],
      },
      colors: {
        dark: "#141414",
        "light-dark": "#161616",
        black: "#000000",
        gray: "#333333",
        orange: "#e87c03",
        "light-gray": "#8b8b8b",
        "lighter-gray": "#e0e0e0",
        red: "#e50914",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
  corePlugins: {
    preflight: true,
  },
};
