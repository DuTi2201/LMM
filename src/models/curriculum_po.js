'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curriculum_PO extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Curriculum_PO.init({
    curriculum_id: DataTypes.INTEGER,
    po_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Curriculum_PO',
  });
  return Curriculum_PO;
};