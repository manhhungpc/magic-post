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
		extend: {}
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
		themes: ['garden']
	}
} satisfies Config;
