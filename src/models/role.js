'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // define association here
      // Role.belongsTo(Account);
      Role.hasOne(Account)
    }
  };
  Role.init({
    // role_url: DataTypes.STRING,
    role_description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};