'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    static associate(models) {
      File.belongsToMany(models.Material, {
        through: 'Material_File',
        foreignKey: 'file_id',
        as: 'material'
      });
      File.belongsToMany(models.Curriculum, {
        through: 'Curriculum_File',
        foreignKey: 'file_id',
        as: 'curriculum'
      });
      File.belongsToMany(models.Subject, {
        through: 'File_Subject',
        foreignKey: 'file_id',
        as: 'subject'
      });
    }
  };
  File.init({
    file_name: DataTypes.STRING,
    file_upload: DataTypes.STRING,
    file_path: DataTypes.STRING,
    file_size: DataTypes.BIGINT,
    mimetype: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'File',
  });
  return File;
};