import { SECRET_JWT } from '$env/static/private';
import SignInSchema from '$lib/schemas/sign-in';
import db from '$lib/server/db';
import { verify } from '@node-rs/argon2';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod(SignInSchema)) };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(SignInSchema));

		if (!form.valid) {
			return fail(400, {
				form,
				message: ''
			});
		}

		const { username, password } = form.data;
		const user = await db.user.findUnique({ where: { username } });

		if (!user) {
			return fail(404, {
				form,
				message: 'Wrong username or password!'
			});
		}

		const verifiedPassword = await verify(user.password, password);

		if (!verifiedPassword) {
			return fail(404, {
				form,
				message: 'Wrong username or password!'
			});
		}

		const authToken = await jwt.sign(
			{ id: user.id, name: user.name, username: user.username, role: user.role },
			SECRET_JWT,
			{ expiresIn: '24h' }
		);

		event.cookies.set('authToken', authToken, {
			path: '/',
			httpOnly: true,
			sameSite: true,
			maxAge: 60 * 60 * 24
		});

		const callbackUrl = event.url.searchParams.get('callback');

		if (callbackUrl) {
			return redirect(303, callbackUrl);
		}

		redirect(303, '/admin');
	}
};
