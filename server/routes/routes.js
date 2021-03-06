const express = require('express');
const controller = require('../controller/routes-controller');
const routes = express.Router();

routes.post('/new', controller.create);
routes.get('/all', controller.read);
routes.get('/users', controller.readTest);
routes.get('/users/:id', controller.findById);
routes.post('/update/:id', controller.update);
routes.post('/delete/:id', controller.destroy);

module.exports = routes;
