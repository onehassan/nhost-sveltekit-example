<script>
	export let data;
	let { session, nhost } = data;
	$: ({ session } = data);

	import { gql } from 'graphql-tag';

	const GET_TODOS = gql`
		query Todos {
			todos {
				id
				text
				done
				createdAt
				updatedAt
			}
		}
	`;

	const getTodos = async () => {
		const response = await nhost.graphql.request(GET_TODOS);
		return response.data.todos;
	};
</script>

<svelte:head>
	<title>Protected Page</title>
	<meta name="description" content="About this app" />
</svelte:head>

<h1 class="text-2xl font-semibold text-center">
	Hi! You are registered with email: {session?.user.email}.
</h1>

<h2>Todos</h2>
{#await getTodos()}
	<p>Loading...</p>
{:then todos}
	<p>Showing {todos.length} posts.</p>

	<ul>
		{#each todos as todo}
			<li>
				{todo.text}
			</li>
		{/each}
	</ul>
{:catch error}
	<p>{error.message}</p>
{/await}
