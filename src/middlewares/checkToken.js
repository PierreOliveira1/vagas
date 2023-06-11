const jwt = require('jsonwebtoken');
require('dotenv').config();
const data = require('../database');

function checkToken(req, res, next) {
	const authorization = req.headers.authorization;

	if (authorization) {
		const [bearer, token] = authorization.split(' ');

		if (!/Bearer/gi.test(bearer) || !token) {
			return res
				.status(400)
				.send({ error: true, message: 'Token mal formatado' });
		}

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			const user = data.find((user) => user.id === decoded.id);

			if (!user) {
				return res.status(400).send({
					message: 'Token inválido',
				});
			}

			if (user.permission !== 'admin') {
				return res.status(401).send({
					message: 'Este usuário não tem permissão',
				});
			}

			next();
		} catch (err) {
			return res.status(400).send({ error: true, message: 'Token inválido' });
		}
	} else {
		return res.status(400).send({
			message: 'Autorização inválida',
		});
	}
}

module.exports = { checkToken };
