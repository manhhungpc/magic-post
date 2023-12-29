import { lazyLoad } from '$lib/lazyLoad';
import { mergeQueries } from 'src/utils/helper';
import type { PageLoad } from './$types';

interface Staffs {
	staffs: {
		data: any[];
		status: number;
	};
}

interface Offices {
	offices: {
		data: any[];
		status: number;
	};
}

export const load: PageLoad = async ({ parent, fetch, url }) => {
	await parent();

	const pointId = url.searchParams.get('pointId') as string;
	const type = url.searchParams.get('type') as string;
	const hasWorkAt = (url.searchParams.get('hasWorkAt') as string) ?? 'false';
	const pageSize = (url.searchParams.get('pageSize') as string) ?? 10;
	const pageNumber = (url.searchParams.get('pageNumber') as string) ?? 1;
	const queryOffices = new URLSearchParams({
		type,
		pageSize,
		pageNumber
	});
	const queryStaffs = new URLSearchParams({
		hasWorkAt
	});
	console.log('🚀 ~ file: +page.ts:29 ~ constload:PageLoad= ~ query:', queryOffices.toString());

	try {
		const staffs = await lazyLoad<Staffs>(
			fetch(`/api/admin/staffs?${queryStaffs}`, {
				method: 'GET'
			}).then((res) => res.json())
		);

		const offices = await lazyLoad<Offices>(
			fetch(`/api/admin/offices?${mergeQueries(queryOffices, new URLSearchParams({ pointId }))}`, {
				method: 'GET'
			}).then((res) => res.json())
		);
		console.log('🚀 ~ file: +page.ts:44 ~ constload:PageLoad= ~ offices:', offices);

		console.log(staffs);

		return {
			staffs,
			offices
		};
	} catch (err) {
		console.log('❗Error:', err);
		return {
			err: 'Internal Server Error!'
		};
	}
};
