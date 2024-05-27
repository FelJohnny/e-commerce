'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {

    static associate(models) {
      Produto.belongsTo(models.Usuario,{
        foreignKey:'usuario_id',
        as:'usuario_produto'
      })
    }
  }
  Produto.init({
    nome: DataTypes.STRING,
    preco: DataTypes.DOUBLE,
    status: DataTypes.BOOLEAN,
    capa_produto: DataTypes.STRING,
    usuario_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName:'Produto',
    tableName:'produtos'
  });
  return Produto;
};