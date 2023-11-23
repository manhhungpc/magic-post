import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { API_URL } from '$env/static/private';

export const GET: RequestHandler = async ({ cookies }) => {
	try {
        const token = cookies.get('token') as string
		const response = await fetch(`${API_URL}/api/v1/management/staffs`, {
			method: 'GET',			
			headers: {
				'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
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


export const POST: RequestHandler = async ({ cookies, request }) => {
	try {
        const token = cookies.get('token') as string
		const response = await fetch(`${API_URL}/api/v1/management/staffs`, {
			method: 'POST',
			body: JSON.stringify(await request.json()),
			headers: {
				'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
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
