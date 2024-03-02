/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        primaryGreen: "#1DC07C",
        primaryOrange: "#F1A34F",
      },
      spacing: {
        128: "62rem",
      },
      height: {
        128: "34rem",
        129: "80vh",
      },
    },
  },
  plugins: [],
};
