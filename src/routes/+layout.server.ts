import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { token } from 'src/utils/stores';

export const load: LayoutServerLoad = async ({ cookies, fetch }) => {
	const accessToken = cookies.get('token') as string;

	if (!accessToken) {
		return {};
	}
	token.set(accessToken);

	const tokenData = JSON.parse(atob(accessToken.split('.')[1]));

	try{

		const responseUser = await fetch('/api/user/me', {
			method: 'GET'
		});
		
		const user = await responseUser.json();
		if (user.status != 200) {
			return {};
		}
		
		return {
			accessToken,
			tokenData,
			userData: user.data
		};
	} catch(err){
		return {}
	}
};
