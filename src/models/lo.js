'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LO extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  LO.init({
    lo_name: DataTypes.STRING,
    lo_description: DataTypes.STRING,
    po_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LO',
  });
  return LO;
};