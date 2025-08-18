// tailwind.config.js
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#EFFAF8",
          100: "#CFF5EE",
          200: "#9FEBDD",
          300: "#6FE1CC",
          400: "#3FD7BB",
          500: "#1EC6AA", // header bg
          600: "#169B85",
          700: "#0E7261", // buttons
          800: "#0B5A4E",
          900: "#084238"
        }
      }
    },
  },
  plugins: [],
};
