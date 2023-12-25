import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { API_URL } from '$env/static/private';
import { removeNullQueries } from 'src/utils/helper';
import { OrderStatus, OrderType } from 'src/utils/enum';

export const GET: RequestHandler = async ({ cookies, url }) => {
	try {
		const token = cookies.get('token') as string;
		const query = url.search
			? url.search
			: new URLSearchParams({
					typeOrder: String(OrderType.GATHERING),
					deliveryStatus: String(OrderStatus.CONFIRM_RECEIVE)
			  });
		const response = await fetch(`${API_URL}/api/v1/gathering-points/order-gatherings?${query}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		});
		const data = await response.json();
		if (response.status != 200) {
			return json({
				status: response.status,
				error: data.message
			});
		}

		return json(data);
	} catch (err) {
		console.log('❗Error:', err);
		return json({
			status: 500,
			err: 'Server error!'
		});
	}
};
