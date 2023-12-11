import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, cookies, params, fetch }) => {
	await parent();

	const accessToken = cookies.get('token')?.toString();
	if (!accessToken) {
		throw redirect(301, '/login');
	}
	try {
		const userData = JSON.parse(atob(accessToken.split('.')[1]));
		const orderId = params.id;
		const order = fetch(`/api/orders/customer/${orderId}`, {
			method: 'GET'
		}).then((res) => res.json());

		return {
			userData,
			streamed: {
				order
			}
		};
	} catch (err) {
		console.error(err);
		return;
	}
};
