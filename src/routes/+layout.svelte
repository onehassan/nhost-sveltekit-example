<script>
	import './styles.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import { goto, invalidate } from '$app/navigation';
	import { removeNhostSessionCookie, setNhostSessionInCookie } from '$lib/utils';
	import { isBrowser } from '@nhost/nhost-js';
	import jsCookie from 'js-cookie';

	export let data;
	let { nhost } = data;
	$: ({ nhost } = data);

	nhost.auth.onAuthStateChanged((event, session) => {
		if (session) {
			setNhostSessionInCookie(session);
		}

		if (isBrowser()) {
			invalidate('nhost:auth');
		}
	});

	nhost.auth.onTokenChanged(() => {
		setNhostSessionInCookie(nhost);
		if (isBrowser()) {
			invalidate('nhost:auth');
		}
	});

	/**
	 * @param {{ detail: { signout: any; }; }} event
	 */
	async function handleSignOut(event) {
		await nhost.auth.signOut();
		removeNhostSessionCookie();
		await goto(`/`);
	}
</script>

<div class="app">
	<Navigation user={data.session?.user} on:signout={handleSignOut} />

	<div class="container p-4 mx-auto mt-8 antialiased">
		<slot />
	</div>
</div>
