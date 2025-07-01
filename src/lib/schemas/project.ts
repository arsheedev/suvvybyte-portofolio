import { z } from 'zod'

const ProjectSchema = z.object({
	id: z.string().min(1, 'Project ID is required!'),
	name: z.string().min(1, 'Project name is required!'),
	clientName: z.string().min(1, 'Client name is required!'),
	clientCode: z.string().min(1, 'Client code is required!'),
	status: z.enum(['pending', 'wip', 'finished', 'canceled']).default('pending'),
	image: z.unknown()
})

export default ProjectSchema
