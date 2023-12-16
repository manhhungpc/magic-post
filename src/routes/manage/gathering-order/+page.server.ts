import { OrderStatus, OrderType } from 'src/utils/enum';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, fetch }) => {
	await parent();
	try {
		const query = new URLSearchParams({
			deliveryStatus: String(OrderStatus.PROCESSING),
			typeOrder: String(OrderType.GATHERING)
		});
		const orders = fetch(`/api/orders/delivery?${query}`, {
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
