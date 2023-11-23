import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch }) => {
	await parent();
	const response = await fetch(`/api/admin/staffs`, {
		method: 'GET'
	});

	const staffs = await response.json();
	console.log('🚀 ~ file: +page.ts:10 ~ staffs:', staffs);

	return { staffs };
};
