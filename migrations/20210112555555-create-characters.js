'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('characters', {
        id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        },
        game_type: {
        type: Sequelize.INTEGER(5),
        allowNull: false,
        },
        character_1: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        },
        character_2: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        },
        character_3: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        },
        character_4: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '',
        },
        character_5: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '',
        },
        character_6: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '',
        },
        character_7: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        },
        character_8: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        },
        character_9: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        },
        character_10: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
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
    await queryInterface.dropTable('characters');
  }
};