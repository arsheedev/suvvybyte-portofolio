import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ cookies }) => {
	cookies.delete('authToken', { path: '/', httpOnly: true, sameSite: true })

	return redirect(303, '/')
}
