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

      Material.belongsToMany(models.User, {
        through: 'Material_User',
        foreignKey: 'material_id',
        as: 'user'
      });
      Material.belongsToMany(models.Subject, {
        through: 'Material_Subject',
        foreignKey: 'material_id',
        as: 'subject'
      });
    }
  };
  Material.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Material',
  });
  return Material;
};