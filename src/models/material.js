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
    
    material_description: DataTypes.STRING,
    author: DataTypes.STRING,
    publisher: DataTypes.STRING,
    isbn: DataTypes.STRING,
    edition: DataTypes.STRING,
    classification: DataTypes.STRING,
    note: DataTypes.MEDIUMTEXT,
    syllabus_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER,
    subject_name: DataTypes.STRING
  },
    {
    sequelize,
    modelName: 'Material',
  });
  return Material;
};