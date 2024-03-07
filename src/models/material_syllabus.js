'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Material_Syllabus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Material_Syllabus.init({
    material_id: DataTypes.INTEGER,
    syllabus_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Material_Syllabus',
  });
  return Material_Syllabus;
};