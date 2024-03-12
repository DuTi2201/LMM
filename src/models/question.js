'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      // define association here
      Question.belongsToMany(Syllabus, { through: 'Question_Syllabus' });
    }
  };
  Question.init({
    question_content: DataTypes.STRING,
    question_answer: DataTypes.STRING,
    question_difficulty: DataTypes.STRING,
    question_status: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};