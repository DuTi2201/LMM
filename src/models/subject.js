'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subject.hasMany(Syllabus);
      Subject.belongsToMany(Curriculum, { through: 'Curriculum_Subject' });
    }
  };
  Subject.init({
    subject_code: DataTypes.STRING,
    subject_name: DataTypes.STRING,
    subject_description: DataTypes.STRING,
    subject_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};