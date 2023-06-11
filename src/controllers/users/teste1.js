const data = require('../../database');

const getUser = (req, res) => {
	const id = Number(req.params.id);

	if (!Number.isInteger(id)) {
		return res.status(400).send({
			message: 'Id deve ser um número inteiro',
		});
	}

	const user = data.find((user) => user.id === id);

	if (!user) {
		return res.status(404).send({
			message: 'Nenhum usuário encontrado',
		});
	}

	data[data.indexOf(user)].accessCount += 1;

	return res.status(200).send({
		...user,
		password: undefined,
	});
};

const getUsers = (req, res) => {
	const newData = data.map((user) => ({
		...user,
		password: undefined,
	}));

	return res.status(200).send(newData);
};

module.exports = {
	getUser,
	getUsers,
};
