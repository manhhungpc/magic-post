import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { token } from 'src/utils/stores';

export const load: LayoutServerLoad = async ({ cookies, fetch }) => {
	const accessToken = cookies.get('token') as string;

	if (!accessToken) {
		return {};
	}
	token.set(accessToken);

	const responseUser = await fetch('/api/user/me', {
		method: 'GET'
	});

	const user = await responseUser.json();

	return {
		accessToken,
		userData: user.data
	};
};
