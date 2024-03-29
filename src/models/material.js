'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Material.belongsToMany(models.File, {
        through: 'Material_File',
        foreignKey: 'material_id',
        as: 'file'
      });

      Material.belongsTo(models.Subject, { foreignKey: 'subject_id', as: 'subject' });
      
    }
  };
  Material.init({
    material_name: DataTypes.STRING,
    material_author: DataTypes.STRING,
    material_publisher: DataTypes.STRING,
    material_isbn: DataTypes.STRING,
    material_edition: DataTypes.STRING,
    material_classification: DataTypes.STRING,
    subject_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Material',
  });
  return Material;
};