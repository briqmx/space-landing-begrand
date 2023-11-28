/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: '#1AA2E6',
				navy: '#041c2c',
				beige: "#f9f9f6",
				'beige-dark': "#f5f1e9"
			},
			fontFamily: {
				display: ['Archia', 'sans-serif'],
				body: ['Instrument Sans', 'sans-serif'],
			}
		},
	},
	plugins: [],
}
