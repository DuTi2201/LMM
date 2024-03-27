'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curriculum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Curriculum.belongsToMany(models.File, {
        through: 'Curriculum_File',
        foreignKey: 'curriculum_id',
        as: 'file'
      });
      
      Curriculum.belongsToMany(models.Subject, {
        through: 'Curriculum_Subject',
        foreignKey: 'curriculum_id',
        as: 'subject'
      });
      
    }
  };
  Curriculum.init({
    curriculum_name: DataTypes.STRING,
    curriculum_code: DataTypes.STRING,
    curriculum_description: DataTypes.STRING,
    total_credits: DataTypes.STRING
    
  }, {
    sequelize,
    modelName: 'Curriculum',
  });
  return Curriculum;
};