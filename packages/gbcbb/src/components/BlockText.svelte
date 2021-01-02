<script>
	import marked from 'marked';

    export let text
	export let _marked = marked;

	async function sanitizeHtml(text){
		const endpoint = `${process.env.UTIL_API_ENDPOINT}/sanitize`
		const request = {
				body: JSON.stringify({
					text: text
				}),
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				}
		}
		let result = await fetch(endpoint, request)
		result = await result.json()
		console.log(result)
		return result.clean
	}
</script>

<div class="box">
	<slot>{@html _marked(text)}</slot>
</div>