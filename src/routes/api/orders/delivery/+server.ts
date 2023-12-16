import { json, type RequestHandler } from '@sveltejs/kit';
import { API_URL } from '$env/static/private';
import { removeNullQueries } from 'src/utils/helper';

export const GET: RequestHandler = async ({ cookies, url }) => {
	try {
		const token = cookies.get('token') as string;
		const requestQuery = new URLSearchParams(url.search);

		// const query = new URLSearchParams(url.search);

		// for (let [key, value] of requestQuery.entries()) {
		// 	query.append(key, value);
		// }

		// const filterQuery = removeNullQueries(query);
		const response = await fetch(`${API_URL}/api/v1/delivery-points/orders?${requestQuery}`, {
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

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const token = cookies.get('token') as string;
		const response = await fetch(`${API_URL}/api/v1/order-delivery`, {
			method: 'POST',
			body: JSON.stringify(await request.json()),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		});
		const data = await response.json();
		if (response.status != 201) {
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
