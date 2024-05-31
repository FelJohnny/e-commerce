const Controller = require('./Controller.js');
const Usuario_Services = require('../Services/Usuario_Services.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const model = require('../models')
const usuario_services = new Usuario_Services();
const camposObrigatorios = ['email','senha','nome_completo','rule_id']

class Usuario_Controller extends Controller{
  constructor(){
      super(usuario_services,camposObrigatorios)
  }

  async loginUsuarioController(req,res){
      const {email, senha} = req.body;
        //validações
        if(!email){
          return res.status(422).json({message:"o email é obrigatorio"});
        }
        if(!senha){
          return res.status(422).json({message:"Por favor, insira uma senha!"});
        }
      
      //checar se o email existe
      const userExist = await this.propsServices.pegaRegistroPorEmail(email)
      if(!userExist.status){
        return res.status(422).json({message:"usuario ou senha incorreto"});
      }
      //checar se a senha cripto confere
      const senhaDB = userExist.retorno.dataValues.senha;
      console.log(senhaDB);
      const checkSenha = await bcrypt.compare(senha, senhaDB)
      if(!checkSenha){
        return res.status(404).json({message:"usuario ou senha incorreto!"});
      }
  
      try{
        const secret = process.env.SECRET;
        const token = jwt.sign({
          id: userExist.retorno.dataValues.id,
          rule: userExist.retorno.dataValues.rule_id
        },secret)
        res.status(200).json({message:"Autentiação realizada com sucesso",token})
        
      }catch(e){
        console.log(e);
        return res.status(500).json({ message: `erro ao logar, mensagem do erro:${e}` });
      }
    }

  async registerUsuarioController(req,res){
      const {email} = req.body;
      const bodyReq = req.body;

      try{
          //valida campos obrigatorios
          const isTrue = await this.allowNull(req, res);
          if(isTrue.status){
            //checar se o usuario existe
            const userExist = await this.propsServices.pegaRegistroPorEmail(email)
            if(userExist.status){
              return res.status(422).json({
                message:"por favor, utilize outro e-mail!",
                error:true
              });
            }
          //gerando senha cripto
          const salt = await bcrypt.genSalt(12);
          const senhaHash = await bcrypt.hash(bodyReq.senha, salt);
          bodyReq.senha = senhaHash;
          //criando usuario
          const createUser = await model.Usuario.create(bodyReq);
          return res.status(200).json({ message: `usuario cadastrado com sucesso`,error:false });
          }else{
              return res.status(500).json({
              message: 'Preencha todos os campos necessarios',
              campos: isTrue.campos,
              error: true,
              });
          }
      }catch(e){
        return res.status(500).json({ message: `erro ao criar, mensagem do erro:${e}` });
      }
    }

  //private route
  async privateRouteUsrController(req, res){
    const id = req.params.id;

    //check se usuario existe
    const userExist = await this.propsServices.pegaUmUsuarioPorId(id)

    if(!userExist){
      return res.status(404).json({message:"usuario nao encontrado", error: true})
    }

    return res.status(200).json({retorno:userExist.dataValues, error: false})

  }
}

module.exports = Usuario_Controller;