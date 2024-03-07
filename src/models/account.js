'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Account.belongsTo(models.Group);
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