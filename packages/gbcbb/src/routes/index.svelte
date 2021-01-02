<script context='module'>
		import client, { FRONTPAGE } from '../qlClient';

		export async function preload({params, query}) {
			const results = await client.query({
					query: FRONTPAGE
			})
			// console.log(JSON.stringify(results.data.frontPage, null, 2))
			return {page: results.data.frontPage}
        }
</script>
<script>
	import BlockText from '../components/BlockText.svelte';
	export let page;

</script>

<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<p>TODO sanitize HTML</p>
<h1>{page.header}</h1>

{#each page.info as section}
  <h2>{section.header}</h2>
  <BlockText text={section.body}/>
{/each}
