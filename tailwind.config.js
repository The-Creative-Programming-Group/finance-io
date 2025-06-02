/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enables Tailwind utility classes in React Native via NativeWind
  presets: [require("nativewind/preset")],

  // Specify files to scan for Tailwind class names
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],

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
    extend: {
      // Adds a custom spacing value (10px) usable as p-2.5, m-2.5, etc.
      spacing: {
        2.5: "10px",
      },
    },
  },

  // Add Tailwind plugins here if needed in the future
  plugins: [],
};

