'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      Account.belongsTo(Role); 
      Account.hasMany(Activity_Log);
      Account.hasMany(Comment);
      Account.belongsToMany(Curriculum, { through: 'Curriculum_Authorization' });
    }
  };

  

  Account.init(
    {
      account_firstname: DataTypes.STRING,
      account_lastname: DataTypes.STRING,
      account_username: DataTypes.STRING,
      account_email: DataTypes.STRING,
      account_password: DataTypes.STRING,
      account_gender: DataTypes.STRING,
      account_address: DataTypes.STRING,
      account_phonenumber: DataTypes.STRING,
      role_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Account',
    }
  );
  return Account;
};
