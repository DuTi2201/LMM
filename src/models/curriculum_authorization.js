'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curriculum_Authorization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Curriculum_Authorization.init({
    curriculum_id: DataTypes.INTEGER,
    account_id: DataTypes.INTEGER,
    authorization_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Curriculum_Authorization',
  });
  return Curriculum_Authorization;
};