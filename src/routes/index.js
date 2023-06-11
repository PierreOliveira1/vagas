const { Router } = require('express');

const teste1 = require('../controllers/users/teste1');
const teste2 = require('../controllers/users/teste2');
const teste3 = require('../controllers/users/teste3');
const teste4 = require('../controllers/users/teste4');
const teste5 = require('../controllers/users/teste5');
const { auth } = require('../controllers/auth');
const { checkToken } = require('../middlewares/checkToken');

const routes = Router();

routes.get('/users/:id', teste1.getUser);
routes.get('/users', teste1.getUsers);
routes.post('/users', teste2);
routes.delete('/users/:id', checkToken, teste3);
routes.patch('/users', checkToken, teste4);
routes.get('/users/access/:id', teste5);
routes.post('/auth', auth);

module.exports = routes;
