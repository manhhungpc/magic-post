import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { token } from 'src/utils/stores';

export const load: LayoutServerLoad = async ({ parent, cookies }) => {
	const accessToken = cookies.get('token') as string;

	if (!accessToken) {
		throw redirect(301, '/login');
	}
	token.set(accessToken);

	const user = JSON.parse(atob(accessToken.split('.')[1]));

	return {
		accessToken,
		userData: user
	};
};
