/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/html/utils/withMT");
module.exports = withMT({
  darkMode: ["class"],

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primaryGreen: "#1DC07C",
        primaryOrange: "#F1A34F",
      },
      spacing: {
        128: "62rem",
        tableHeight: "35rem",
      },
      width: {
        128: "90rem",
      },
      height: {
        128: "34rem",
        129: "80vh",
        130: "32rem",
        chatHeight: "94vh",
        131: "80vh",
        132: "25rem",
      },
    },
  },
  plugins: [],
});
