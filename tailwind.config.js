/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enables Tailwind utility classes in React Native via NativeWind
  presets: [require("nativewind/preset")],
  // Specify files to scan for Tailwind class names
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
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
