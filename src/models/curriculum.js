'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curriculum extends Model {
    static associate(models) {
      // define association here
      Curriculum.belongsToMany(Account, { through: 'Curriculum_Authorization' });
      Curriculum.belongsToMany(Subject, { through: 'Curriculum_Subject' });
      Curriculum.belongsToMany(PO, { through: 'Curriculum_PO' });
      Curriculum.hasOne(Schedule);
    }
  };
  Curriculum.init({
    curriculum_name: DataTypes.STRING,
    curriculum_description: DataTypes.STRING,
    curriculum_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Curriculum',
  });
  return Curriculum;
};