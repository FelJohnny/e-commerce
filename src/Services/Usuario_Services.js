const Services = require('./Services.js');
const model = require('../models/index.js');
const bcrypt = require('bcrypt');

class Usuario_Services extends Services{
    constructor(){
        super('Usuario')
    }


}

module.exports = Usuario_Services;