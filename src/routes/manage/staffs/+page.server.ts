import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, fetch, url }) => {
	await parent();

	try {
		const pageSize = (url.searchParams.get('pageSize') as string) ?? 10;
		const pageNumber = (url.searchParams.get('pageNumber') as string) ?? 1;
		const query = new URLSearchParams({
			pageSize,
			pageNumber
		});

		const staffs = fetch(`/api/admin/staffs?${query}`, {
			method: 'GET'
		}).then((res) => res.json());

		return {
			streamed: {
				staffs: staffs
			}
		};
	} catch (err) {
		console.log('❗Error:', err);
		return {
			err: 'Internal Server Error!'
		};
	}
};
