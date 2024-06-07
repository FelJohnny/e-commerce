const express = require('express');
const cors = require('cors');
const usuario = require('./Usuario_Routes.js')
const rule = require('./Rule_Routes.js')
const produto = require('./Produto_Routes.js')
const pedido = require('./Pedido_Routes.js')
module.exports = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(usuario,rule,produto,pedido);
  };