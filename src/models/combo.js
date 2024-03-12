'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Combo extends Model {
    static associate(models) {
      // define association here
    }
  };
  Combo.init({
    combo_name: DataTypes.STRING,
    combo_description: DataTypes.STRING,
    curriculum_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Combo',
  });
  return Combo;
};