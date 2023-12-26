import { removeNullQueries } from 'src/utils/helper';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, fetch, url }) => {
	await parent();

	const typePoint = String(url.searchParams.get('typePoint') ?? 'TP');

	const pointId = String(url.searchParams.get('pointId'));
	const query = removeNullQueries(
		new URLSearchParams({
			typePoint,
			pointId
		})
	);

	const points = fetch(`/api/admin/offices?${new URLSearchParams({ type: typePoint })}`, {
		method: 'GET'
	}).then((res) => res.json());

	const stats = fetch(`/api/statistic/admin?${query}`, {
		method: 'GET'
	}).then((res) => res.json());

	return { streamed: { stats, points } };
};
