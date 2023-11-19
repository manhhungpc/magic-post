import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ url, cookies }) => {
	try {
		let data: any;

		cookies.set('token', data, {
			path: '/',
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7 // 1 week
		});
		return json({
			status: 201,
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
