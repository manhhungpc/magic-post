import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch, url }) => {
	await parent();
	const staffsResponse = await fetch(`/api/admin/staffs`, {
		method: 'GET'
	});

	const typeOffices = url.searchParams.get('type') || 'GP';
	const officesResponse = await fetch(`/api/admin/offices?type=${typeOffices}`, {
		method: 'GET'
	});

	const staffs = await staffsResponse.json();
	const offices = await officesResponse.json();
	console.log('🚀 ~ file: +page.ts:16 ~ offices:', offices);

	return { staffs, offices };
};
