import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, fetch, params }) => {
	await parent();
	try {
		const orders = fetch(`/api/orders/customer/${params.id}`, {
			method: 'GET'
		}).then((res) => res.json());

		return {
			streamed: {
				orders
			}
		};
	} catch (err) {
		console.log('❗Error:', err);
		return {
			err: 'Internal Server Error!'
		};
	}
};
