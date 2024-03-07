'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Syllabus_LO extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Syllabus_LO.init({
    syllabus_id: DataTypes.INTEGER,
    lo_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Syllabus_LO',
  });
  return Syllabus_LO;
};