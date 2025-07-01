<script lang="ts">
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
</script>

<a href="/admin/projects/tambah">tambah</a>

<pre>{JSON.stringify(data.projects, null, 2)}</pre>
