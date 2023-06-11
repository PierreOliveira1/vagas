const data = require('../../database');

function accessUser(req, res) {
	const id = Number(req.params.id);

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

	console.log(user);

	return res.status(200).send({
		message: `Usuário ${user.name} foi lido ${user.accessCount} vezes.`,
	});
}

module.exports = accessUser;
