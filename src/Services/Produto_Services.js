const Services = require('./Services.js');
const model = require('../models/index.js')

class Usuario_Services extends Services{
    constructor(){
        super('produtos')
    }

    async pegaTodosProdutosPorPage_Services(ItenStarted,limit) {
        const listaServicos = await model.Produto.findAll({
          attributes:[
            'id',
            'nome',
            'preco',
            'status',
            'capa_produto',
            [model.sequelize.fn('CONCAT',process.env.URL_ADM + '/public/uploads/images/',model.sequelize.col('capa_produto')),'url_img_produto']

          ],
          include: [{
            model: model.Usuario,
            as:'usuario_produto',
            attributes:['id','email','nome_completo','rule_id'],
          }],
            offset: Number(ItenStarted),
            limit:Number(limit),
            order:[['id','DESC']],
        });
      
      
        if (listaServicos) {
            console.log('Nenhum registro encontrado na base de dados.');
            return { error: true, retorno: listaServicos };
        } else {
            console.log('Registros encontrados na base de dados.');
            return { retorno: pedidosComItens, error: false };
        }
      }
}

module.exports = Usuario_Services;