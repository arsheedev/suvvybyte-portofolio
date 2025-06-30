import { SECRET_JWT } from '$env/static/private';
import { redirect, type Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
	const authToken = event.cookies.get('authToken') ?? null;

	if (authToken === null) {
		event.locals.user = null;

		if (event.url.pathname.startsWith('/admin')) {
			return redirect(303, `/auth/sign-in?callback=${event.url.pathname}`);
		}

		return await resolve(event);
	}

	try {
		const verified = await jwt.verify(authToken, SECRET_JWT);

		event.locals.user = verified as {
			id: string;
			name: string;
			username: string;
			role: 'ADMIN' | 'USER';
		};
	} catch {
		event.locals.user = null;
	}

	return await resolve(event);
};
