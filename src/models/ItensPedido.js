'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItensPedido extends Model {
    static associate(models) {
      ItensPedido.belongsTo(models.Pedido, {
        foreignKey: 'pedido_id',
        as: 'pedido'
      });
      ItensPedido.belongsTo(models.Produto, {
        foreignKey: 'produto_id',
        as: 'produto'
      });
    }
  }
  ItensPedido.init({
    pedido_id: DataTypes.INTEGER,
    produto_id: DataTypes.INTEGER,
    quantidade: DataTypes.INTEGER,
    preco: DataTypes.DOUBLE,
  }, {
    sequelize,
    modelName: 'ItensPedido',
    tableName: 'itens_pedido'
  });
  return ItensPedido;
};
