import type { PageServerLoad } from './$types';

enum OrderType {
	CUSTOMER = 'SC',
	GATHERS = 'GP',
	TRANSACTION = 'TP'
}

export const load: PageServerLoad = async ({ parent, fetch, url }) => {
	await parent();
	try {
		const requestQuery = new URLSearchParams(url.search);

		const orders = fetch(`/api/orders/customer?${requestQuery}`, {
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
