'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users',
        'password'
    );
  },

  down: async (queryInterface, Sequelize) => {}
};