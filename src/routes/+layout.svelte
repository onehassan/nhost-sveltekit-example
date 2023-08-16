<script>
	import { goto, invalidate } from '$app/navigation';
	import Navigation from '$lib/components/Navigation.svelte';
	import { setNhostSessionInCookie } from '$lib/nhost-auth-sveltekit';
	import { onMount } from 'svelte';
	import './styles.css';

	export let data;
	let { nhost } = data;

	onMount(() => {
		nhost.auth.onAuthStateChanged((_, session) => {
			setNhostSessionInCookie(session);
			invalidate('nhost:auth');
		});
	});

	/**
	 * @param {{ detail: { signout: any; }; }} event
	 */
	async function handleSignOut(event) {
		await nhost.auth.signOut();
		await goto(`/`);
	}
</script>

<div class="app">
	<Navigation user={data.session?.user} on:signout={handleSignOut} />

	<div class="container p-4 mx-auto mt-8 antialiased">
		<slot />
	</div>
</div>
