const { Router } = require('express');
const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const AuthMiddleware = require('./middleware/Auth');
const PunkApiController = require('./controllers/PunkApiController');

const routes = Router();

routes.all('*', AuthMiddleware.verifyJwt);

routes.post('/api/v1/create-user', UserController.create);
routes.post('/api/v1/login', AuthController.logar);
routes.get('/api/v1/beers', PunkApiController.index);
routes.get('/api/v1/beers/:id', PunkApiController.find);
routes.get('/api/v1/beers/random', PunkApiController.random);

module.exports = routes;
