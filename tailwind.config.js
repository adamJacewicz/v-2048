module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
    },
    extend: {
      colors: {
        brown: {
          200: "#E9E4DF",
          400: "#B8A795",
          600: "#8f7a66",
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
    require("@tailwindcss/aspect-ratio"),
  ],
}
