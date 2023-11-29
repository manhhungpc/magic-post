import { redirect } from '@sveltejs/kit';
import { token } from 'src/utils/stores';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	cookies.delete('token');
	token.set('');

	// invalidateAll();

	throw redirect(302, '/');
};
