import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { API_URL } from '$env/static/private';

export const PUT: RequestHandler = async ({ cookies, request, params }) => {
	try {
		const token = cookies.get('token') as string;
		const id = params.id;
		if (!id) {
			return json({
				status: 400,
				error: 'Thiếu params!'
			});
		}
		const response = await fetch(`${API_URL}/api/v1/management/staffs/${id}`, {
			method: 'PUT',
			body: JSON.stringify(await request.json()),
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

export const DELETE: RequestHandler = async ({ cookies, params }) => {
	try {
		const token = cookies.get('token') as string;
		const id = params.id;
		if (!id) {
			return json({
				status: 400,
				error: 'Thiếu params!'
			});
		}
		const response = await fetch(`${API_URL}/api/v1/management/staffs/${id}`, {
			method: 'DELETE',

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
