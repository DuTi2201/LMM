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
      Subject.belongsToMany(models.Material, {
        through: 'Material_Subject',
        foreignKey: 'subject_id',
        as: 'material'
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