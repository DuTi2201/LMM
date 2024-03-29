'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Material', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      material_name: {
        type: Sequelize.STRING
      },
      material_author: {
        type: Sequelize.STRING
      },
      material_publisher: {
        type: Sequelize.STRING
      },
      material_isbn: {
        type: Sequelize.STRING
      },
      material_edition: {
        type: Sequelize.STRING
      },
      material_classification: {
        type: Sequelize.STRING
      },
      subject_id: {
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
    await queryInterface.dropTable('Material');
  }
};