const express = require('express');
const routes = require('./routes/index.js');
const app = express();
const sequelize = require('./config/config.js')

sequelize.authenticate()
.then(()=>{
    console.log('conexão estabelecida com sucesso');
})
.catch((err) => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });
routes(app) 

module.exports = app;