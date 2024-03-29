'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.hasMany(models.User, {
        foreignKey: 'group_id',
        as: 'users'
      });
      Group.belongsToMany(models.Role, {
        through: 'Group_Role',
        foreignKey: 'group_id',
        as: 'role'  });
    }
  };
  Group.init({
    group_name: DataTypes.STRING,
    group_description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};