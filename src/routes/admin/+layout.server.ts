import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	// const token = cookies.get('token')?.toString();
	// if (!token) {
	// 	throw redirect(303, '/login');
	// }
	// console.log('🚀 ~ file: +layout.server.ts:13 ~ data:', token);
	// try {
	// 	const userData = atob(token.split('.')[1]);
	// 	return userData;
	// } catch (err) {
	// 	console.error(err);
	// 	return;
	// }
};
