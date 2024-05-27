'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    
    static associate(models) {
      Usuario.belongsTo(models.Rule,{
        foreignKey:'id',
        as:'rule-references'
      });
      Usuario.hasMany(models.Produto,{
        foreignKey:'usuario_id'
      })
    }
  }
  Usuario.init({
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    nome_completo: DataTypes.STRING,
    rule_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName:'usuarios'
  });
  return Usuario;
};