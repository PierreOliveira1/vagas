const data = require('../../database');
const cacheId = require('../../cache/id');

function deleteUser(req, res) {
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

	data.splice(data.indexOf(user), 1);

	cacheId.push(id);

	return res.status(200).send({
		success: true,
	});
}

module.exports = deleteUser;
