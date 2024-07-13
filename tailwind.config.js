module.exports = {
	content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
	safelist: [
		{
			pattern: /^grid-(rows|cols)-([1-6])/
		},
		{
			pattern: /^translate-(x|y)-(([2-6])x-)?full/
		}, {
			pattern: /^(w|h)-1\/([2-6])/
		},
		{
			pattern: /^bg-tile-\d/
		}
	],
	theme: {
		fontFamily: {
			sans: ["Open Sans", "sans-serif"]
		},
		extend: {
			translate: {
				"2x-full": "200%",
				"3x-full": "300%",
				"4x-full": "400%",
				"5x-full": "500%",
				"6x-full": "600%"
			},
			screens: {
				xs: "576px"
			},
			lineHeight: {
				16: "3.5rem"
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
					900: "#5a5249"
				},
				tile: {
					0: "#D1C6BA",
					2: "#eee4da",
					4: "#ede0c8",
					8: "#f2b179",
					16: "#f59563",
					32: "#f67c5f",
					64: "#f65e3b",
					128: "#edcf72",
					256: "#edc850",
					512: "#edc53f",
					1024: "#eec22e",
					2048: "#d6bf2e"
				}
			}
		}
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("@tailwindcss/aspect-ratio")
	]
}
