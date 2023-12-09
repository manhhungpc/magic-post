import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	await parent();
	// try {
	// 	const user = fetch(`/api/user/me`, {
	// 		method: 'GET'
	// 	}).then((res) => res.json());

	// 	return {
	// 		streamed: {
	// 			user
	// 		}
	// 	};
	// } catch (err) {
	// 	console.log('❗Error:', err);
	// 	return {
	// 		err: 'Internal Server Error!'
	// 	};
	// }
};
