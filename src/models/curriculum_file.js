'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curriculum_File extends Model {
    static associate(models) {
      
    }
  };
  Curriculum_File.init({
    curriculum_id: DataTypes.INTEGER,
    file_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Curriculum_File',
  });
  return Curriculum_File;
};