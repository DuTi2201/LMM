'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity_Log extends Model {
    static associate(models) {
      // define association here
      Activity_Log.belongsTo(Account);
    }
  };
  Activity_Log.init({
    activity_type: DataTypes.STRING,
    activity_date: DataTypes.STRING,
    activity_detail: DataTypes.STRING,
    account_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Activity_Log',
  });
  return Activity_Log;
};