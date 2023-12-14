import type { PageServerLoad } from './$types';

enum OrderType {
	CUSTOMER = 'SC',
	GATHERS = 'GP',
	TRANSACTION = 'TP'
}

export const load: PageServerLoad = async ({ parent, fetch, url }) => {
	await parent();
	try {
		const pageSize = (url.searchParams.get('pageSize') as string) ?? 10;
		const pageNumber = (url.searchParams.get('pageNumber') as string) ?? 1;

		const query = new URLSearchParams({
			orderType: 'SC',
			pageSize,
			pageNumber
		});
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
