<script>
	import { goto, invalidate } from '$app/navigation';
	import Navigation from '$lib/components/Navigation.svelte';
	import { removeNhostSessionCookie, setNhostSessionInCookie } from '$lib/nhost-auth-sveltekit';
	import { onMount } from 'svelte';
	import './styles.css';

	export let data;
	let { nhost } = data;

	/**
	 * @param {{ detail: { signout: any; }; }} event
	 */
	async function handleSignOut(event) {
		await nhost.auth.signOut();
		await goto(`/`);
	}

	onMount(() => {
		nhost.auth.onAuthStateChanged((_, session) => {
			if (session) {
				setNhostSessionInCookie(session);
			} else {
				removeNhostSessionCookie();
			}

			invalidate('nhost:auth');
		});
	});
</script>

<div class="app">
	<Navigation user={data.session?.user} on:signout={handleSignOut} />

	<div class="container p-4 mx-auto mt-8 antialiased">
		<slot />
	</div>
</div>
