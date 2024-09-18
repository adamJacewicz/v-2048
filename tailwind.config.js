module.exports = {
	content: ["./src/**/*.{vue,js,ts,jsx,tsx}", "./index.html"],
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
			sans: ["Roboto", "sans-serif"]
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
			colors: {
				accent: {
					50: "rgb(250 249 248)",
					100: "rgb(239 236 233)",
					200: "rgb(227 221 216)",
					300: "rgb(213 205 198)",
					400: "rgb(196 184 174)",
					500: "rgb(173 157 143)",
					600: "rgb(143 130 118)",
					700: "rgb(117 106 97)",
					800: "rgb(97 88 80)",
					900: "rgb(68 62 57)",
					950: "rgb(42 38 35)",
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
