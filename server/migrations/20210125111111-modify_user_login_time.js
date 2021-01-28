'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('login_users',
        'time', {
        type: Sequelize.INTEGER,
        allowNull: true,
        after: "login_at"
        }
    );
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('login_users', 
      'time'
    );
  }
};