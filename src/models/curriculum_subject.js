'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curriculum_Subject extends Model {
    static associate(models) {
      
    }
  };
  Curriculum_Subject.init({
    curriculum_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Curriculum_Subject',
  });
  return Curriculum_Subject;
};