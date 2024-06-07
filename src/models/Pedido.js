'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    static associate(models) {
      Pedido.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario'
      });
      Pedido.belongsToMany(models.Produto, {
        through: 'ItensPedido',
        foreignKey: 'pedido_id',
        otherKey: 'produto_id',
        as: 'produtos'
      });
    }
  }
  Pedido.init({
    total: DataTypes.DOUBLE,
    status: DataTypes.STRING,
    usuario_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pedido',
    tableName: 'pedidos'
  });
  return Pedido;
};
