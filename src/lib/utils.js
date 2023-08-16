import Cookies from 'js-cookie';

export const NHOST_SESSION_KEY = 'nhostSession';
export const unProtectedRoutes = ['/', '/sign-in', '/sign-up'];

/** @param {import('@nhost/nhost-js').NhostClient | import('@nhost/nhost-js').NhostSession | null} param */
export const setNhostSessionInCookie = (param) => {
	const session = param && 'auth' in param ? param.auth.getSession() : param;

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

export const removeNhostSessionCookie = () => Cookies.remove(NHOST_SESSION_KEY);
