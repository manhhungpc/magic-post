import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('token')?.toString();
	if (!token) {
		throw redirect(303, '/login');
	}

	try {
		const userData = JSON.parse(atob(token.split('.')[1]));
		return {
			userData: userData.sub
		};
	} catch (err) {
		console.error(err);
		return { err };
	}
};
