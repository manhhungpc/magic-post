import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { token } from 'src/utils/stores';

export const load: LayoutServerLoad = async ({ parent, cookies }) => {
	await parent();

	const accessToken = cookies.get('token')?.toString();
	if (!accessToken) {
		throw redirect(301, '/login');
	}
	try {
		const userData = JSON.parse(atob(accessToken.split('.')[1]));
		return { userData };
	} catch (err) {
		console.error(err);
		return;
	}
};
