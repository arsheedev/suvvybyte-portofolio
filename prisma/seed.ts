import { hash } from '@node-rs/argon2';
import { PrismaClient } from '@prisma-app/client';

const db = new PrismaClient();

async function main() {
	const password = await hash('Lonely110');

	await db.user.create({ data: { name: 'Admin', username: 'admin', password, role: 'ADMIN' } });
}

main()
	.then(async () => {
		await db.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await db.$disconnect();
		process.exit(1);
	});
