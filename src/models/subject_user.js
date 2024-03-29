'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject_User extends Model {
    static associate(models) {
      
    }
  };
  Subject_User.init({
    user_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subject_User',
  });
  return Subject_User;
};