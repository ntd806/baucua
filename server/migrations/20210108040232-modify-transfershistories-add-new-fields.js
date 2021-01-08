'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('transfershistories', 
      'bank_acc_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        after: "user_id"
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('transfershistories', 
      'bank_acc_id'
    );
  }
};
