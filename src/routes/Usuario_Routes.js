const { Router } = require('express');
const Usuario_Controller = require('../Controllers/Usuario_Controller.js');

const usuario_controller = new Usuario_Controller();

const route = Router();

route.post('/api/auth/login',(req,res)=>{ usuario_controller.loginUsuarioController(req,res)});
route.get('/api/auth/login/:id',(req,res)=>{ usuario_controller.privateRouteUsrController(req,res)});
route.post('/api/auth/register', (req, res) => {usuario_controller.registerUsuarioController(req, res)});


module.exports = route;