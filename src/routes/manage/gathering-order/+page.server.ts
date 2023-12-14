import type { PageServerLoad } from './$types';

enum OrderType {
	CUSTOMER = "SC",
	GATHERS = "GP",
	TRANSACTION = "TP"
}

export const load: PageServerLoad = async ({ parent, fetch }) => {
	await parent();
	try {
		const query = new URLSearchParams({
			orderType: 'SC' 
		})
		const orders = fetch(`/api/orders/customer?${query}`, {
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
