'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LO extends Model {
    static associate(models) {
      // define association here
      LO.belongsToMany(Syllabus, { through: 'Syllabus_LO' });
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