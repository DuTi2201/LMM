'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assessment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Assessment.init({
    assessment_name: DataTypes.STRING,
    assessment_description: DataTypes.STRING,
    assessment_type: DataTypes.STRING,
    assessment_weight: DataTypes.STRING,
    assessment_date: DataTypes.STRING,
    syllabus_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Assessment',
  });
  return Assessment;
};