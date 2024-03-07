'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      schedule_name: {
        type: Sequelize.STRING
      },
      schedule_description: {
        type: Sequelize.STRING
      },
      schedule_start_date: {
        type: Sequelize.STRING
      },
      schedule_end_date: {
        type: Sequelize.STRING
      },
      schedule_file: {
        type: Sequelize.STRING
      },
      curriculum_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Schedules');
  }
};