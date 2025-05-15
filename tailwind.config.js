/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    colors: {
      background: "hsl(240, 60%, 99.02%)",
      primary: "hsl(243.33, 40.91%, 91.37%)",
      secondary: "hsl(240, 30.77%, 94.9%)",
      accent: "hsl(220.92, 79.72%, 57.45%)",
      text: "hsl(246.67, 75%, 4.71%)",
      stroke: "hsl(210, 39.39%, 87.06%)",
      backgroundText: "hsl(242.73, 20.75%, 79.22%)",
      danger: "hsl(0, 54.46%, 39.61%)",
      warn: "hsl(43.64, 54.46%, 39.61%)",
      good: "hsl(140.25, 34.48%, 54.51%)",

      dark: {
        background: "hsl(0, 0%, 4.31%)",
        primary: "hsl(0, 0%, 12.94%)",
        secondary: "hsl(0, 2.86%, 6.86%)",
        accent: "hsl(220.92, 79.72%, 57.45%)",
        text: "hsl(0, 0%, 87.45%)",
        stroke: "hsl(0, 0%, 10.98%)",
        backgroundText: "hsl(240, 3.52%, 39.02%)",
        danger: "hsl(0, 54.46%, 39.61%)",
        warn: "hsl(43.64, 54.46%, 39.61%)",
        good: "hsl(140.25, 34.48%, 54.51%)",
      },
    },
    extend: {},
  },
  plugins: [],
};
