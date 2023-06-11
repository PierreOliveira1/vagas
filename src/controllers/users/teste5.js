const data = require('../../database');

function accessUser(req, res) {
	const name = req.query.name.toLowerCase();

	const user = data.find((user) => user.name.toLowerCase() === name);

	if (!user) {
		return res.status(404).send({
			message: 'Este usuário não existe',
		});
	}

	return res.status(200).send({
		message: `Usuário ${user.name} foi lido ${user.accessCount} vezes.`,
	});
}

module.exports = accessUser;
