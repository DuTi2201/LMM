'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Syllabus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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