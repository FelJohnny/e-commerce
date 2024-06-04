const { Router } = require('express');
const Produto_Controller = require('../Controllers/Produto_Controller.js');
const uploadImg = require('../../middlewares/multerUploadImg.js');
const checkTokenLogin = require('../../middlewares/checkTokenLogin.js')


const produto_controller = new Produto_Controller();

const route = Router();

route.post("/api/produto", checkTokenLogin, uploadImg.single("img_produto"), (req, res) => produto_controller.criaProduto_Controller(req, res));
route.get("/api/produto", (req, res) => produto_controller.pegaTodosProdutosPorPage_Controller(req, res));
route.get('/api/produto/usuario/:id', checkTokenLogin,(req, res) => {produto_controller.PegaProdutoPorUsuarioId(req, res)});
route.get("/api/produto/:id", checkTokenLogin,(req, res) => produto_controller.pegaProdutosPorId_Controller(req, res));
route.put('/api/produto/:id', checkTokenLogin, uploadImg.single("img_produto"),(req, res) => produto_controller.atulizaProduto_Controller(req, res));
route.delete('/api/produto/:id', checkTokenLogin,(req, res) => produto_controller.excluiRegistroController(req, res));


module.exports = route;