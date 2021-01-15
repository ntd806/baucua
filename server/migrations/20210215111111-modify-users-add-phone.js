'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 
      'phone', {
        type: Sequelize.STRING,
        allowNull: false,
        after: "id"
      },
      'refreshToken', {
        type: Sequelize.STRING,
        allowNull: false,
        after: "phone"
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 
      'phone'
    );
    await queryInterface.removeColumn('users', 
      'refreshToken'
    );
  }
};
