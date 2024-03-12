'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question_Syllabus extends Model {
    static associate(models) {
      // define association here
    }
  };
  Question_Syllabus.init({
    question_id: DataTypes.INTEGER,
    syllabus_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Question_Syllabus',
  });
  return Question_Syllabus;
};