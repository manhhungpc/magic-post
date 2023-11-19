import type { LayoutServerLoad } from './$types';
import { token } from 'src/utils/stores';
export const load: LayoutServerLoad = ({ cookies }) => {
	const accessToken = cookies.get('token');

	if (!accessToken) {
		return {};
	}
	token.set(accessToken);
	return {
		accessToken
	};
};
