const data = require('../../database');
const cacheId = require('../../cache/id');

function deleteUser(req, res) {
	const name = req.query.name;

	const user = data.find((user) => user.name === name);

	if (!user) {
		return res.status(404).send({
			message: 'Este usuário não existe',
		});
	}

	const { id } = user;

	data.splice(data.indexOf(user), 1);

	cacheId.push(id);

	return res.status(200).send({
		success: true,
	});
}

module.exports = deleteUser;
