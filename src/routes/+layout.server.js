import { NHOST_SESSION_KEY } from '$lib/utils';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
	const nhostSessionCookie = cookies.get(NHOST_SESSION_KEY);

	return {
		nhostSession: nhostSessionCookie ? JSON.parse(nhostSessionCookie) : null
	};
}
