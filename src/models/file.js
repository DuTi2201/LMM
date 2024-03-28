'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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