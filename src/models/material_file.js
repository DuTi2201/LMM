'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Material_File extends Model {
    static associate(models) {
     
    }
  };
  Material_File.init({
    material_id: DataTypes.INTEGER,
    file_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Material_File',
  });
  return Material_File;
};