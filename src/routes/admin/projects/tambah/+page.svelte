<script lang="ts">
	import * as Form from '$lib/components/ui/form'
	import { Input } from '$lib/components/ui/input'
	import * as Select from '$lib/components/ui/select'
	import ProjectSchema from '$lib/schemas/project'
	import { toast } from 'svelte-sonner'
	import { superForm } from 'sveltekit-superforms'
	import { zodClient } from 'sveltekit-superforms/adapters'
	import type { ActionData, PageData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()
	let loading = $state(false)

	const formAction = superForm(data.form, {
		validators: zodClient(ProjectSchema),
		onSubmit() {
			loading = true
		},
		onResult({ result }) {
			loading = false
			if (result.type === 'failure') {
				toast.error(result.data?.message || 'Something went wrong!')
			} else if (result.type === 'redirect') {
				toast.success('Project data added!')
			}
		},
		onError() {
			loading = false
			toast.error('Internal error!')
		}
	})

	const { form: formData, enhance } = formAction
</script>

<form method="POST" enctype="multipart/form-data" autocomplete="off" use:enhance>
	<Form.Field form={formAction} name="id">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Project ID</Form.Label>
				<Input {...props} disabled={loading} bind:value={$formData.id} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field form={formAction} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Project Name</Form.Label>
				<Input {...props} disabled={loading} bind:value={$formData.name} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field form={formAction} name="clientCode">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Client Code</Form.Label>
				<Input {...props} disabled={loading} bind:value={$formData.clientCode} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field form={formAction} name="clientName">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Client Name</Form.Label>
				<Input {...props} disabled={loading} bind:value={$formData.clientName} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field form={formAction} name="status">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Status</Form.Label>
				<Select.Root
					type="single"
					disabled={loading}
					bind:value={$formData.status}
					name={props.name}
				>
					<Select.Trigger {...props}>
						{$formData.status ? $formData.status : 'Select project status'}
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="pending" label="Pending" />
						<Select.Item value="wip" label="Work in Progress" />
						<Select.Item value="finished" label="Finished" />
						<Select.Item value="canceled" label="Canceled" />
					</Select.Content>
				</Select.Root>
			{/snippet}
		</Form.Control>
		<Form.Description>
			Project status, you can leave it empty because the default value is 'pending'.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field form={formAction} name="image">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Project Image Preview</Form.Label>
				<Input {...props} disabled={loading} type="file" bind:value={$formData.image} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<p>{form?.message}</p>
	<Form.Button disabled={loading}>Submit</Form.Button>
</form>
