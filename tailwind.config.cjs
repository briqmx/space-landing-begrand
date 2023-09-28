/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: '#1AA2E6',
				navy: '#041c2c',
			},
			fontFamily: {
				display: ['Archia', 'sans-serif'],
			}
		},
	},
	plugins: [],
}
