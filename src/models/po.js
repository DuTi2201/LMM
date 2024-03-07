'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PO extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PO.belongsToMany(Curriculum, { through: 'Curriculum_PO' });
    }
  };
  PO.init({
    po_name: DataTypes.STRING,
    po_description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PO',
  });
  return PO;
};