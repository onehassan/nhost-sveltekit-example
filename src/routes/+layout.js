// src/routes/+layout.js
import { PUBLIC_NHOST_REGION, PUBLIC_NHOST_SUBDOMAIN } from '$env/static/public';
import { NhostClient } from '@nhost/nhost-js';
import { waitFor } from 'xstate/lib/waitFor';
import { unProtectedRoutes } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

/** @type {import('@nhost/nhost-js').NhostClient | null} */
const nhost = new NhostClient({
	region: PUBLIC_NHOST_REGION,
	subdomain: PUBLIC_NHOST_SUBDOMAIN,
	start: false
});

export const load = async ({ data, depends, route }) => {
	depends('nhost:auth');

	if (!nhost.auth.client.started) {
		nhost.auth.client.start({ initialSession: data.nhostSession });

		if (nhost.auth.client.interpreter) {
			await waitFor(nhost.auth.client?.interpreter, (state) => !state.hasTag('loading'));
		}
	}

	const session = nhost.auth.getSession();

	if (!unProtectedRoutes.includes(route.id ?? '')) {
		if (!session) {
			throw redirect(303, '/');
		}
	}

	return {
		nhost: nhost,
		session: session
	};
};
