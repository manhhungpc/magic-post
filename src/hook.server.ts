import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

const unProtectedRoutes = ['/', '/login', '/tracking'];

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');
	if (!token && !unProtectedRoutes.includes(event.url.pathname)) {
		throw redirect(303, '/login');
	}

	return await resolve(event);
};
