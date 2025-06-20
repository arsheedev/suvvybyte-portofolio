import { hash } from '@node-rs/argon2';
import { PrismaClient } from './generated';

const db = new PrismaClient();

async function main() {
	const arsheePassword = await hash('Lonely110', {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});

	await db.user.create({
		data: {
			name: 'Arshee Vincent',
			username: 'arshee',
			password: arsheePassword,
			role: 'ADMIN'
		}
	});

	const pandaxPassword = await hash('yourpassword', {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});

	await db.user.create({
		data: {
			name: 'your name',
			username: 'pandax',
			password: pandaxPassword,
			role: 'ADMIN'
		}
	});
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
