const zod = require('zod');
const data = require('../../database');
const { mapIssuesZodError } = require('../../utils/mapIssuesZodError');

const updateSchema = zod.object({
	username: zod
		.string()
		.min(3, {
			message: 'Deve ter pelo menos 3 caracteres',
		})
		.max(20, {
			message: 'Deve ter no máximo 20 caracteres',
		})
		.optional(),
	name: zod
		.string()
		.min(3, {
			message: 'Deve ter pelo menos 3 caracteres',
		})
		.max(50, {
			message: 'Deve ter no máximo 20 caracteres',
		})
		.optional(),
	job: zod
		.string()
		.min(3, {
			message: 'Deve ter pelo menos 3 caracteres',
		})
		.max(30, {
			message: 'Deve ter no máximo 20 caracteres',
		})
		.optional(),
	permission: zod
		.enum(['admin', 'user'], {
			required_error: 'Campo obrigatório',
		})
		.optional(),
	password: zod
		.string()
		.min(3, {
			message: 'Deve ter pelo menos 3 caracteres',
		})
		.max(20, {
			message: 'Deve ter no máximo 20 caracteres',
		})
		.optional(),
});

async function updateUser(req, res) {
	try {
		const id = Number(req.query.id);
		const { username, name, job, permission, password } =
			await updateSchema.parseAsync(req.body);

		if (!Number.isInteger(id)) {
			return res.status(400).send({
				message: 'Id deve ser um número inteiro',
			});
		}

		const user = data.find((user) => user.id === id);

		if (!user) {
			return res.status(404).send({
				message: 'Este usuário não existe',
			});
		}

		const updatedUser = {
			id: user.id,
			username: username ?? user.username,
			name: name ?? user.name,
			job: job ?? user.job,
			permission: permission ?? user.permission,
			password: password ?? user.password,
		};

		data[data.indexOf(user)] = updatedUser;

		return res.send(updatedUser);
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

module.exports = updateUser;
