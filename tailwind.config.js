/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.js",
    "./wp-templates/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      lg: { max: "1400px" },
      md: { max: "1080px" },
      sm: { max: "640px" },
    },
    extend: {
      colors: {
        gmt: {
          transparent: "#00000065",
          100: "#F8F8F8",
          200: "#EBEBEB",
          300: "#CCCCCC",
          400: "#888888",
          500: "#555555",
        },
      },
      fontFamily: {
        sans: ["proxima-nova", "sans-serif"],
      },
    },
  },
  plugins: [],
};
