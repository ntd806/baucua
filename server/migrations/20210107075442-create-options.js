'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('options', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      game_type: {
        type: Sequelize.INTEGER(5),
        allowNull: false,
      },
      proportionality: {
        type: Sequelize.INTEGER(5),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
      },
      updated_at: {
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)"),
      },
      is_play: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
      },
      is_active: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('options');
  }
};