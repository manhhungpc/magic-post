// import type { PageServerLoad } from './$types';

// interface Staffs {
// 	staffs: {
// 		data: any[];
// 		status: number;
// 	};
// }

// interface Offices {
// 	offices: {
// 		data: any[];
// 		status: number;
// 	};
// }

// export const load: PageServerLoad = async ({ parent, fetch, url }) => {
// 	await parent();

// 	try {
// 		const typeOffices = url.searchParams.get('type');

// 		const staffs = fetch(`/api/admin/staffs`, {
// 			method: 'GET'
// 		}).then((res) => res.json());

// 		const offices = fetch(`/api/admin/offices?type=${typeOffices}`, {
// 			method: 'GET'
// 		}).then((res) => res.json());
// 		console.log('🚀 ~ file: +page.server.ts:29 ~ constload:PageServerLoad= ~ offices:', offices, new Date());

// 		return {
// 			streamed: {
// 				staffs: staffs,
// 				offices: offices
// 			}
// 		};
// 	} catch (err) {
// 		console.log('❗Error:', err);
// 		return {
// 			err: 'Internal Server Error!'
// 		};
// 	}
// };
