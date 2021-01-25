'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('options',
        'is_play', {
          type: Sequelize.TINYINT(1),
          allowNull: true
        }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('options',
        'is_play'
    );
  }
};
