import { type RequestHandler } from '@sveltejs/kit'
import fs from 'fs'
import path from 'path'

export const GET: RequestHandler = async ({ params }) => {
	const dirname = process.cwd()
	const file = fs.readFileSync(path.join(dirname, 'files', 'images', params.file as string))

	return new Response(file, { status: 202 })
}
