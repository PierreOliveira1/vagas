const data = require('../database');
const cacheId = require('../cache/id');

function generateId() {
	if (cacheId.length > 0) {
		return cacheId.shift();
	}

	return data.length + 1;
}

module.exports = { generateId };
