'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('login_users', 
      'logout_at'
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('login_users',
        'logout_at', {
          type: Sequelize.DATE(3),
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)"),
          allowNull: true,
          after: "login_at"
        }
    );
  }
};
