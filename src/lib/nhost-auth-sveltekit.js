import Cookies from 'js-cookie';
import { NhostClient, isBrowser } from '@nhost/nhost-js';
import { PUBLIC_NHOST_REGION, PUBLIC_NHOST_SUBDOMAIN } from '$env/static/public';
import { invalidate } from '$app/navigation';

export const NHOST_SESSION_KEY = 'nhostSession';

/** @type {import('@nhost/nhost-js').NhostClient | null} */
let nhost;

/** @param {import('@nhost/nhost-js').NhostSession | null} session */
export const setNhostSessionInCookie = (session) => {
	if (!session) {
		Cookies.remove(NHOST_SESSION_KEY);
		return;
	}

	const expires = new Date();

	// * Expire the cookie 60 seconds before the token expires
	expires.setSeconds(expires.getSeconds() + session.accessTokenExpiresIn - 60);

	Cookies.set(NHOST_SESSION_KEY, JSON.stringify(session), {
		sameSite: 'strict',
		expires
	});
};

/** @param {import('@sveltejs/kit').Cookies} cookies */
export const getNhostSessionFromCookie = (cookies) => {
	const nhostSessionCookie = cookies.get(NHOST_SESSION_KEY);
	return nhostSessionCookie ? JSON.parse(nhostSessionCookie) : null;
};

/** @param {import('@nhost/nhost-js').NhostSession} session */
export const getNhostLoadClient = async (session) => {
	if (isBrowser() && nhost) {
		return nhost;
	}

	nhost = new NhostClient({
		region: PUBLIC_NHOST_REGION,
		subdomain: PUBLIC_NHOST_SUBDOMAIN,
		start: false
	});

	if (isBrowser()) {
		nhost.auth.onAuthStateChanged((_, session) => {
			setNhostSessionInCookie(session);
			invalidate('nhost:auth');
		});
	}

	nhost.auth.client.start({ initialSession: session });

	return nhost;
};
