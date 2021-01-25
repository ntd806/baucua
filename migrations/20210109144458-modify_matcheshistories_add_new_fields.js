'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('matcheshistories',
        'placed_at', {
          type: Sequelize.DATE(3),
          allowNull: true
        }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('matcheshistories',
        'placed_at'
    );
  }
};
