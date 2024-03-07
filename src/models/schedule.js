'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.belongsTo(Curriculum);
    }
  };
  Schedule.init({
    schedule_name: DataTypes.STRING,
    schedule_description: DataTypes.STRING,
    schedule_start_date: DataTypes.STRING,
    schedule_end_date: DataTypes.STRING,
    schedule_file: DataTypes.STRING,
    curriculum_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};