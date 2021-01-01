<script context='module'>
	import client, { SITE_SETTINGS } from '../qlClient';

	export async function preload({params, query}) {
			const results = await client.query({
					query: SITE_SETTINGS
			})
			console.log(JSON.stringify(results.data, null, 2))
			return {page: results.data.siteSetting}
	}
</script>

<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
	export let page;
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<svelte:head>
	<title>{page.title}</title>
</svelte:head>

<Nav {segment}/>

<main>
	<slot></slot>
</main>