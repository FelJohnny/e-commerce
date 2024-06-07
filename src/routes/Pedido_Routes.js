const { Router } = require('express');
const Pedido_Controller = require('../Controllers/Pedido_Controller.js');
const checkTokenLogin = require('../../middlewares/checkTokenLogin.js');

const pedido_controller = new Pedido_Controller();

const route = Router();

route.post('/api/pedido', checkTokenLogin, (req, res) => pedido_controller.criaPedido_Controller(req, res));
route.get('/api/pedido/usuario/:id', checkTokenLogin, (req, res) => pedido_controller.pegaPedidosPorUsuarioId_Controller(req, res));

module.exports = route;
