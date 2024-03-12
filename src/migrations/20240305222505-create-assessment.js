'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Assessments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      assessment_name: {
        type: Sequelize.STRING
      },
      assessment_description: {
        type: Sequelize.STRING
      },
      assessment_type: {
        type: Sequelize.STRING
      },
      assessment_weight: {
        type: Sequelize.STRING
      },
      assessment_date: {
        type: Sequelize.STRING
      },
      syllabus_id: {
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
    await queryInterface.dropTable('Assessments');
  }
};