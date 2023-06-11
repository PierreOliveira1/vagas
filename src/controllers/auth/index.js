const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const zod = require('zod');
require('dotenv').config();
const data = require('../../database');
const { mapIssuesZodError } = require('../../utils/mapIssuesZodError');

const authSchema = zod.object({
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

async function auth(req, res) {
	try {
		const { username, password } = await authSchema.parseAsync(req.body);

		const user = data.find((user) => user.username === username);

		if (!user) {
			return res.status(400).send({
				message: 'Credenciais inválidas',
			});
		}

		if (!bcrypt.compareSync(password, user.password)) {
			return res.status(400).send({
				message: 'Credenciais inválidas',
			});
		}

		const token = jwt.sign(
			{
				id: user.id,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: '1h',
			},
		);

		return res.status(200).send({
			token,
		});
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

module.exports = { auth };
