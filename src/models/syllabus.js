'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Syllabus extends Model {
    static associate(models) {
      // define association here
      Syllabus.belongsToMany(LO, { through: 'Syllabus_LO' });
      Syllabus.belongsToMany(Question, { through: 'Question_Syllabus' });
      Syllabus.belongsToMany(Material, { through: 'Material_Syllabus' });
      Syllabus.belongsTo(Subject);
      Syllabus.hasMany(Assessment);
      Syllabus.hasMany(Comment);
    }
  };
  Syllabus.init({
    syllabus_name: DataTypes.STRING,
    syllabus_description: DataTypes.STRING,
    syllabus_status: DataTypes.STRING,
    subject_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Syllabus',
  });
  return Syllabus;
};