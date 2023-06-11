const bcrypt = require('bcryptjs');
const zod = require('zod');
const data = require('../../database');
const { generateId } = require('../../utils/generateId');
const { mapIssuesZodError } = require('../../utils/mapIssuesZodError');

const createSchema = zod.object({
	username: zod
		.string({
			required_error: 'Campo obrigatório',
		})
		.min(3, {
			message: 'Deve ter pelo menos 3 caracteres',
		})
		.max(20, {
			message: 'Deve ter no máximo 20 caracteres',
		}),
	name: zod
		.string({
			required_error: 'Campo obrigatório',
		})
		.min(3, {
			message: 'Deve ter pelo menos 3 caracteres',
		})
		.max(50, {
			message: 'Deve ter no máximo 20 caracteres',
		}),
	job: zod
		.string({
			required_error: 'Campo obrigatório',
		})
		.min(3, {
			message: 'Deve ter pelo menos 3 caracteres',
		})
		.max(30, {
			message: 'Deve ter no máximo 20 caracteres',
		}),
	permission: zod.enum(['admin', 'user'], {
		required_error: 'Campo obrigatório',
	}),
	password: zod
		.string({
			required_error: 'Campo obrigatório',
		})
		.min(3, {
			message: 'Deve ter pelo menos 3 caracteres',
		})
		.max(20, {
			message: 'Deve ter no máximo 20 caracteres',
		}),
});

async function createUser(req, res) {
	try {
		const { username, name, job, permission, password } =
			await createSchema.parseAsync(req.body);

		const userAlreadyExists = data.some(
			(user) => user.name === name && user.job === job,
		);

		if (userAlreadyExists) {
			return res.status(400).send({
				message: 'Este usuário já existe',
			});
		}

		const id = generateId();

		const hash = bcrypt.hashSync(password, 10);

		const newUser = {
			id,
			username,
			name,
			job,
			permission,
			password: hash,
		};

		data.push(newUser);

		return res.status(201).send(newUser);
	} catch (error) {
		if (error instanceof zod.ZodError) {
			return res.status(400).send({
				issues: mapIssuesZodError(error),
			});
		}

		return res.status(500).send({
			message: 'Erro interno do servidor',
		});
	}
}

module.exports = createUser;
