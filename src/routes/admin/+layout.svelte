<script lang="ts">
	import type { Snippet } from 'svelte'
	import { Toaster } from 'svelte-sonner'
	import type { LayoutData } from './$types'

	let { data, children }: { data: LayoutData; children: Snippet } = $props()
</script>

<nav>
	<a href="/admin">Dashboard</a>
	<a href="/admin/projects">Projects</a>
</nav>

{@render children()}

<Toaster position="top-center" richColors={true} closeButton={true} />
