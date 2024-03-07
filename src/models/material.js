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
      // define association here
      Material.belongsToMany(Syllabus, { through: 'Material_Syllabus' });
    }
  };
  Material.init({
    material_name: DataTypes.STRING,
    material_description: DataTypes.STRING,
    material_type: DataTypes.STRING,
    material_url: DataTypes.STRING,
    syllabus_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Material',
  });
  return Material;
};