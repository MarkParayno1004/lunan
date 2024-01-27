/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
      },
      backgroundImage: {
        "FAQ-background": "url('src/assets/faqBG.png')",
      },
    },
  },
  plugins: [],
};
