'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matcheshistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      win: {
        type: Sequelize.INTEGER(3),
        allowNull: false,
        defaultValue: 0,
      },
      lose: {
        type: Sequelize.INTEGER(3),
        allowNull: false,
        defaultValue: 0,
      },
      type_bet: {
        type: Sequelize.INTEGER(5),
        allowNull: false,
        defaultValue: 0,
      },
      place_bet: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '',
      },
      stake: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.INTEGER(3),
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
      },
      updated_at: {
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matcheshistories');
  }
};