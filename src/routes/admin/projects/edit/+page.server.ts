import ProjectSchema from '$lib/schemas/project'
import db from '$lib/server/db'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const project = await db.project.findUnique({
		where: { id: String(url.searchParams.get('id')) }
	})

	return { form: await superValidate(zod(ProjectSchema)), project }
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(ProjectSchema))
		const { url } = event

		if (!form.valid) {
			return fail(400, {
				form,
				message: ''
			})
		}

		const currentId = String(url.searchParams.get('id'))
		const currentProject = await db.project.findUnique({ where: { id: currentId } })

		if (!currentProject) {
			return fail(404, {
				form,
				message: 'Project data not found!'
			})
		}

		const { id, name, clientCode, clientName, status, image } = form.data

		const isExist = await db.project.findUnique({ where: { id } })

		if (isExist && currentProject.id !== id) {
			return fail(400, {
				form,
				message: 'Project code already used!'
			})
		}

		const file = image as File | undefined

		if (file) {
			if (!(file instanceof File)) {
				return fail(400, { form, message: 'Image file is required!' })
			}

			if (file.size === 0) {
				return fail(400, { form, message: 'Image is required!' })
			}

			if (!file.type.startsWith('image')) {
				return fail(400, { form, message: 'Image format is not supported!' })
			}

			const dirname = process.cwd()
			const uploadData = await file.arrayBuffer()

			fs.rm(path.join(dirname, currentProject.imageUrl), async (err) => {
				if (err) {
					return
				}
				await sharp(uploadData).webp().toFile(path.join(dirname, currentProject.imageUrl))
			})
		}

		await db.project.update({
			where: { id: currentProject.id },
			data: {
				id,
				name,
				clientCode,
				clientName,
				status
			}
		})

		return redirect(303, '/admin/projects')
	}
}
