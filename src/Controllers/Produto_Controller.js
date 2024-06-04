const Controller = require('./Controller.js');
const Produto_Services = require('../Services/Produto_Services.js');
const produto_services = new Produto_Services();
const camposObrigatorios = ['nome', 'preco', 'status'];
const model = require('../models/index.js');
const jwt = require('jsonwebtoken');

class Produto_Controller extends Controller {
  constructor() {
    super(produto_services, camposObrigatorios);
  }

  async criaProduto_Controller(req, res) {
    const transaction = await model.sequelize.transaction(); // Inicia uma transação
    try {
      const isTrue = await this.allowNull(req, res);

      if (isTrue.status) {
        const dadosParaCriacao = req.body;

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
          return res.status(401).json({ message: "Acesso negado", error: true });
        }

        const secret = process.env.SECRET;
        const { id } = jwt.decode(token, secret);

        // Verifica se o usuário existe na tabela `usuarios`
        const usuarioExistente = await model.Usuario.findByPk(id);
        if (!usuarioExistente) {
          await transaction.rollback(); // Reverte a transação se o usuário não for encontrado
          return res.status(400).json({ message: "Usuário não encontrado", error: true });
        }

        // Cria o produto
        const novoRegistroCriado = await model.Produto.create({
          nome: dadosParaCriacao.nome,
          preco: dadosParaCriacao.preco,
          status: dadosParaCriacao.status,
          capa_produto: req.file.filename, // Adiciona o nome do arquivo da imagem
          usuario_id: id,
        }, { transaction }); // Inclui a criação do produto na transação

        // Confirma a transação se tudo estiver correto
        await transaction.commit(); // Confirma a transação

        return res.status(200).json({
          message: "Produto cadastrado com sucesso!",
          error: false,
          post: novoRegistroCriado,
        });

      } else {
        await transaction.rollback(); //Reverte a transação se campos obrigatórios estiverem faltando
        return res.status(500).json({
          message: 'Preencha todos os campos necessários',
          campos: isTrue.campos,
          error: true,
        });
      }
    } catch (e) {
      await transaction.rollback(); // Reverte a transação em caso de erro
      console.log(e);
      return res.status(400).json({ message: `Não foi possível criar o post, ${e}`, error: true });
    }
  }

  async pegaTodosProdutosPorPage_Controller(req,res){
          //PAGINACAO
          const { page = 1 } = req.query;
          //limite de registros em cada pagina
          const limit = 9;
          var lastPage = 1;
    
          //consultando quantidade de pedidos encontrados por codcli
          const countProdutos = await model.Produto.count();

          if(countProdutos !== 0){
            lastPage = Math.ceil(countProdutos / limit)
            
            //Criando objeto com as informações de paginacao
            var paginacao ={
              //caminho
              path: '/api/produto',
              total_Servicos: countProdutos,
              limit_por_page: limit,
              current_page: page,
              total_Pages: lastPage,
              prev_page_url: page - 1 >= 1 ? page -1: false,
              next_page_url: Number(page) + Number(1) > lastPage ? false : Number(page) + 1,
            }
            const ItenStarted = (page * limit) - limit

            const produtos = await produto_services.pegaTodosProdutosPorPage_Services(ItenStarted,limit)

            if(produtos.retorno.length === 0){
              return res.status(400).json({message:`não foi possivel encontrar o registro`});
            }else{
              return res.status(200).json({servicos:produtos,paginacao});
            }
          }else{
            return res.status(400).json({message:`sem produtos para comprar no momento`});
          }
  }

  async pegaProdutosPorId_Controller(req,res){
    try {
      const {id} = req.params
      const listaRegistros = await model.Usuario.findByPk(id,{
        include:[{model: model.Produto}]
      });

      if(listaRegistros === null){
        return res.status(500).json({ message: `o registro ${id} não foi encontrado`,error:true});
      }else{
        return res.status(200).json(listaRegistros)
      }
      } catch (e) {
        console.log(e);
        return res.status(500).json({ message: `erro ao buscar registro, mensagem do erro: ${e}` });
  }
  }

  async PegaProdutoPorUsuarioId(req,res){
    try {
      const {id} = req.params
      const listaRegistros = await model.Usuario.findByPk(id,{
        include:[{
          model: model.Produto, as:'produtos',
          attributes:[
            'id',
            'nome',
            'preco',
            'status',
            'capa_produto',
            [model.sequelize.fn('CONCAT',process.env.URL_ADM + '/public/uploads/images/',model.sequelize.col('capa_produto')),'url_img_produto'],
            'createdAt',
            'updatedAt',
          ]
        }],
        attributes:[]
      });

      if(listaRegistros === null){
        return res.status(500).json({ message: `o registro ${id} não foi encontrado`,error:true});
      }else{
        return res.status(200).json(listaRegistros)
      }
    }catch (e) {
      console.log(e);
      return res.status(500).json({ message: `erro ao buscar registro, mensagem do erro: ${e}` });
    }
  }

  async atulizaProduto_Controller(req, res) {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    try {
      const umRegistro = await this.propsServices.pegaUmRegistroPorId(Number(id));
      if(umRegistro == null){
        return res.status(400).json({message:`não foi possivel encontrar o registro: ${id}`,resposta:umRegistro});
      }
      const bodyOk = Object.getOwnPropertyNames(dadosAtualizados).every((campo) => {
        return Object.values(umRegistro._options.attributes).includes(campo);
      });

      if(bodyOk){
        console.log(bodyOk);
        const foiAtulizado = await this.propsServices.atualizaProduto_Services(dadosAtualizados,Number(id)); 
        return res.status(200).json({ message: `registro atualizado`, reg:umRegistro});
      }else{
        return res.status(400).json({ message: `campos digitados não conferem`});
      }

    } catch (e) {
      return res.status(500).json(e.message);
    }
  }
}

module.exports = Produto_Controller;
