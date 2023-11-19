import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { API_URL } from '$env/static/private';

export const POST: RequestHandler = async ({ cookies, request }) => {
	try {
		const response = await fetch(`${API_URL}/api/v1/login`, {
			method: 'POST',
			body: JSON.stringify(await request.json()),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json();
		if (response.status != 200) {
			return json({
				status: response.status,
				error: data.message
			});
		}

		const token = data.data.accessToken;
		cookies.set('token', token, {
			path: '/',
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7 // 1 week
		});

		return json({
			status: 200,
			data
		});
	} catch (err) {
		console.log('❗Error:', err);
		return json({
			status: 500,
			err: 'Server error!'
		});
	}
};
