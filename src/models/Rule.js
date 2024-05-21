'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rule extends Model {

    static associate(models) {
      Rule.hasMany(models.Usuario,{
        foreignKey:'rule_id',
        as:'usuario_reference'
      })
    }
  }
  Rule.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rule',
    tableName: 'rules',
  });
  return Rule;
};