'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    static associate(models) {
      Subject.belongsToMany(models.Curriculum, {
        through: 'Curriculum_Subject',
        foreignKey: 'subject_id',
        as: 'curriculum'
      });

      Subject.belongsToMany(models.User, {
        through: 'Subject_User',
        foreignKey: 'subject_id',
        as: 'user'
      });
      Subject.hasMany(models.Material, { foreignKey: 'subject_id',as: 'subject' });
      Subject.belongsToMany(models.File, {
        through: 'File_Subject',
        foreignKey: 'subject_id',
        as: 'file'
      });
    }
  };
  Subject.init({
    subject_name: DataTypes.STRING,
    subject_code: DataTypes.STRING,
    subject_description: DataTypes.STRING,
    subject_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};