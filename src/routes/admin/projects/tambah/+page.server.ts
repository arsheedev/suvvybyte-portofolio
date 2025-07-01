import ProjectSchema from '$lib/schemas/project';
import db from '$lib/server/db';
import { createId } from '@paralleldrive/cuid2';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import path from 'path';
import sharp from 'sharp';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod(ProjectSchema)) };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(ProjectSchema));

		if (!form.valid) {
			return fail(400, {
				form,
				message: ''
			});
		}

		const { id, name, clientCode, clientName, status, image } = form.data;

		const projectExist = await db.project.findUnique({ where: { id } });

		if (projectExist) {
			return fail(400, {
				form,
				message: 'Project ID is already used!'
			});
		}

		const file = image as File | undefined;

		if (!(file instanceof File)) {
			return fail(400, { form, message: 'Image file is required!' });
		}

		if (file.size === 0) {
			return fail(400, { form, message: 'Image is required!' });
		}

		if (!file.type.startsWith('image')) {
			return fail(400, { form, message: 'Image format is not supported!' });
		}

		const dirname = process.cwd();
		const fileName = createId() + file.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() + '.webp';
		const uploadData = await file.arrayBuffer();

		await sharp(uploadData)
			.webp()
			.toFile(path.join(dirname, 'files', 'images', fileName));

		await db.project.create({
			data: { id, name, clientCode, clientName, status, imageUrl: `/files/images/${fileName}` }
		});

		return redirect(303, '/admin/projects');
	}
};
