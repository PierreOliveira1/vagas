const data = require('../../database');

const getUser = (req, res) => {
	const name = decodeURIComponent(req.query.name).toLowerCase();

	const user = data.find((user) => user.name.toLowerCase() === name);

	if (!user) {
		return res.status(404).send({
			message: 'Nenhum usuário encontrado',
		});
	}

	data[data.indexOf(user)].accessCount += 1;

	return res.status(200).send(user);
};

const getUsers = (req, res, next) => {
	res.send(data);
};

module.exports = {
	getUser,
	getUsers,
};
