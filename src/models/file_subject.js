'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File_Subject extends Model {
    static associate(models) {
      // define association here
    }
  };
  File_Subject.init({
    file_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'File_Subject',
  });
  return File_Subject;
};