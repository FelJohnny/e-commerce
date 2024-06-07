const Services = require('./Services.js');
const model = require('../models/index.js');

class Pedido_Services extends Services {
  constructor() {
    super('Pedido');
  }

  async criaPedido(dadosPedido, produtos) {
    const transaction = await model.sequelize.transaction();
    try {
      const pedido = await model.Pedido.create(dadosPedido, { transaction });

      for (const produto of produtos) {
        await model.ItensPedido.create({
          quantidade: produto.quantidade,
          preco: produto.preco,
          pedido_id: pedido.id,
          produto_id: produto.id
        }, { transaction });
      }

      await transaction.commit();
      return pedido;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async pegaPedidosPorUsuarioId(usuarioId) {
    return model.Pedido.findAll({
      where: { usuario_id: usuarioId },
      include: [{
        model: model.Produto,
        as: 'produtos',
        attributes:[
          'id',
          'nome',
          'preco',
          'status',
          'capa_produto',
          [model.sequelize.fn('CONCAT',process.env.URL_ADM + '/public/uploads/images/',model.sequelize.col('capa_produto')),'url_img_produto']
        ],
        through: { attributes: ['quantidade', 'preco'] }
      }]
    });
  }
}

module.exports = Pedido_Services;
