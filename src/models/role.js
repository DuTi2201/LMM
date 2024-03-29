'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // define association here
      Role.belongsToMany(models.Group, {
        through: 'Group_Role',
        foreignKey: 'role_id',
        as: 'group' 
      });
    }
  }
  Role.init({
    url: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};