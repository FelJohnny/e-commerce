const { Router } = require('express');
const Rule_Controller = require('../Controllers/Rule_Controller');


const rule_Controller = new Rule_Controller();

const route = Router();

route.post('/api/rules', (req, res) => {rule_Controller.criaRegistroController(req, res)});
route.get('/api/rules', (req, res) => {rule_Controller.pegaTodosController(req, res)});
route.get('/api/rules/:id', (req, res) => rule_Controller.pegaUmRegistroPorIdController(req, res));
route.put('/api/rules/:id', (req, res) => rule_Controller.atulizaDadoController(req, res));
route.delete('/api/rules/:id', (req, res) => rule_Controller.excluiRegistroController(req, res));

module.exports = route;