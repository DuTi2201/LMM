'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Combo_Subject extends Model {
    static associate(models) {
      // define association here
    }
  };
  Combo_Subject.init({
    combo_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Combo_Subject',
  });
  return Combo_Subject;
};