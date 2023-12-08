module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /^bg-tile-\d/,
    },
  ],
  theme: {
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
    },
    extend: {
      screens: {
        xs: '576px',
      },
      lineHeight: {
        16: "3.5rem",
      },
      colors: {
        primary: {
          50: "#fbfbfa",
          100: "#f8f6f4",
          200: "#ede9e5",
          300: "#e3dcd5",
          400: "#cdc1b5",
          500: "#b8a795",
          600: "#a69686",
          700: "#8a7d70",
          800: "#6e6459",
          900: "#5a5249",
        },
        tile: {
          blank: "#D1C6BA",
          2: "#eee4da",
          4: "#ffdbc8",
          8: "#f3b27a",
          16: "#f69664",
          32: "#f77c5f",
          64: "#f75f3b",
          128: "#edd073",
          256: "#FF5252",
          512: "#FFBF13",
          1024: "#FF9011",
          2048: "#FF1111",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
}
