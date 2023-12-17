import { Roles } from 'src/utils/enum';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

enum OrderType {
	CUSTOMER = 'SC',
	GATHERS = 'GP',
	TRANSACTION = 'TP'
}

export const load: PageServerLoad = async ({ parent, fetch, url }) => {
	const parentData = await parent();
	if (![Roles.TRANSACTION_LEADER, Roles.TRANSACTION_STAFF].includes(parentData.userData.role.id)) {
		throw redirect(302, '/manage/processing-order');
	}
	try {
		const requestQuery = new URLSearchParams(url.search);

		const orders = fetch(`/api/orders/customer?${requestQuery}`, {
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
