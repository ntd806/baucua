'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('login_users', 
      'logout_at'
    );
  },

  down: async (queryInterface, Sequelize) => {
  }
};
