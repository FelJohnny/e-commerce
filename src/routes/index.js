const express = require('express');
const cors = require('cors');
const usuario = require('./Usuario_Routes.js')
const rule = require('./Rule_Routes.js')
module.exports = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(usuario,rule);
  };