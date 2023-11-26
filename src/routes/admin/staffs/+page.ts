import { lazyLoad } from '$lib/lazyLoad';
import type { PageLoad } from './$types';

interface Staffs {
	staffs: {
		data: any[];
		status: number;
	};
}

export const load: PageLoad = async ({ parent, fetch, url }) => {
	await parent();

	const pageSize = (url.searchParams.get('pageSize') as string) ?? 10;
	const query = new URLSearchParams({
		pageSize: pageSize
	});
	const staffs = await lazyLoad<Staffs>(
		fetch(`/api/admin/staffs?${query}`, {
			method: 'GET'
		}).then((res) => res.json())
	);

	return { staffs };
};
