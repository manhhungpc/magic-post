import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, fetch, url }) => {
	await parent();

	try {
		const stats = fetch(`/api/statistic`, {
			method: 'GET'
		}).then((res) => res.json());

		return {
			streamed: {
				stats: stats
			}
		};
	} catch (err) {
		console.log('❗Error:', err);
		return {
			err: 'Internal Server Error!'
		};
	}
};
