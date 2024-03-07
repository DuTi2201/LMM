'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      account_firstname: {
        type: Sequelize.STRING
      },
      account_lastname: {
        type: Sequelize.STRING
      },
      account_username: {
        type: Sequelize.STRING
      },
      account_email: {
        type: Sequelize.STRING
      },
      account_password: {
        type: Sequelize.STRING
      },
      account_gender: {
        type: Sequelize.STRING
      },
      account_address: {
        type: Sequelize.STRING
      },
      account_phonenumber: {
        type: Sequelize.STRING
      },
      group_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Accounts');
  }
};