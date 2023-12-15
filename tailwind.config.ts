import { join } from 'path';
import type { Config } from 'tailwindcss';
import { skeleton } from '@skeletonlabs/tw-plugin';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			boxShadow: {
				'r-md': '0 35px 60px -15px rgba(0, 0, 0, 0.3)'
			}
		},
		colors: {
			ocean: '#2460E5',
			fail: 'rgb(255, 49, 65)',
			greenNew: '#0FBA81',
			'greenNew-600': '#0CA874',
			process: '#EBB309',
			'process-600': '#D3A108',
			orange: '#F96843'
		}
	},
	plugins: [
		skeleton({
			themes: { preset: ['crimson'] }
		}),

		require('daisyui')
	],
	daisyui: {
		base: false,
		prefix: 'dui-',
		themes: [
			{
				garden: {
					...require('daisyui/src/theming/themes')['[data-theme=garden]'],
					primary: '#D4163C',
					secondary: '#F96843'
				}
			}
		]
	}
} satisfies Config;
