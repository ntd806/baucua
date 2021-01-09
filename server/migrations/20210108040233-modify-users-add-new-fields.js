'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 
      'access_token', {
        type: Sequelize.STRING,
        allowNull: false,
        after: "id_token"
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users',
      'access_token', {
        type: Sequelize.STRING,
        allowNull: false,
      }
    );
  }
};
