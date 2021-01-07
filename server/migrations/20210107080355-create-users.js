'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      permission_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('employee', 'super_admin', 'travel_admin', 'travel_team_manager', 'manager', 'supplier', "customer"),
        allowNull: false,
        defaultValue: 'customer',
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: 1,
      },
      token_face: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'facebook',
      },
      token_youtu: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'youtube',
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
    await queryInterface.dropTable('users');
  }
};