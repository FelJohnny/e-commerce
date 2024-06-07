const Controller = require('./Controller.js');
const Pedido_Services = require('../Services/Pedido_Services.js');
const pedido_services = new Pedido_Services();
const camposObrigatorios = ['produtos'];
const model = require('../models/index.js');
const jwt = require('jsonwebtoken');


class Pedido_Controller extends Controller {
  constructor() {
    super(pedido_services, camposObrigatorios);
  }

  async criaPedido_Controller(req, res) {
    try {
        const isTrue = await this.allowNull(req, res);
        
        if(isTrue.status){

            const { produtos } = req.body;  // Extrai a lista de produtos do corpo da requisição
            const authHeader = req.headers['authorization'];  // Extrai o cabeçalho de autorização
            const token = authHeader && authHeader.split(" ")[1];  // Obtém o token JWT do cabeçalho de autorização

            if (!token) {
                return res.status(401).json({ message: "Acesso negado", error: true });  // Retorna um erro se o token não for fornecido
            }

            const secret = process.env.SECRET;  // Obtém o segredo JWT das variáveis de ambiente
            const { id } = jwt.decode(token, secret);  // Decodifica o token JWT para obter o ID do usuário

            try {
                // Calcula o total do pedido somando o preço vezes a quantidade de cada produto
                const dadosPedido = {
                    total: produtos.reduce((sum, p) => sum + p.preco * p.quantidade, 0),
                    status: 'pendente',  // Define o status inicial do pedido como 'pendente'
                    usuario_id: id  // Adiciona o ID do usuário ao pedido
                };

                // Cria o pedido utilizando o serviço de pedidos
                const pedido = await pedido_services.criaPedido(dadosPedido, produtos);

                // Retorna uma resposta de sucesso com o pedido criado
                return res.status(200).json({
                    message: "Pedido criado com sucesso!",
                    error: false,
                    pedido
                });
            } catch (e) {
                // Retorna uma resposta de erro caso ocorra algum problema na criação do pedido
                return res.status(500).json({ message: `Não foi possível criar o pedido, ${e}`, error: true });
            }
        }else{
            return res.status(500).json({
                message: 'Preencha todos os campos necessários',
                campos: isTrue.campos,
                error: true,
              });
        }
    } catch (e){
        console.log(e);
        return res.status(500).json({ message: `Não foi possível criar o pedido, ${e}`, error: true });
    }
}


  async pegaPedidosPorUsuarioId_Controller(req, res) {
    const { id } = req.params;
    try {
      const pedidos = await pedido_services.pegaPedidosPorUsuarioId(id);
      return res.status(200).json(pedidos);
    } catch (e) {
      return res.status(500).json({ message: `Erro ao buscar pedidos, ${e}`, error: true });
    }
  }
}

module.exports = Pedido_Controller;
