const Services = require('./Services.js');
const model = require('../models/index.js');
const bcrypt = require('bcrypt');

class Usuario_Services extends Services{
    constructor(){
        super('Usuario')
    }
    async pegaUmUsuarioPorId(id) {
        return model[this.nomeModel].findByPk(id,{
            attributes:['id','email','nome_completo','rule_id','createdAt','updatedAt']
        });
    }

}

module.exports = Usuario_Services;