import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, fetch, params }) => {
	await parent();
	try {
		const orderId = params.id;
		const trackingHistory = fetch(`/api/tracking/${orderId}`, {
			method: 'GET'
		}).then((res) => res.json());

		return {
			streamed: {
				trackingHistory
			}
		};
	} catch (err) {
		console.log('❗Error:', err);
		return {
			err: 'Internal Server Error!'
		};
	}
};
