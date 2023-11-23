import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, fetch }) => {
	await parent();
};
