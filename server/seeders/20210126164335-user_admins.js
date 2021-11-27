'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_admins', [{
      user_name: 'admin',
      password: '$2a$10$2/LLCKB9l4nwS8FVCl/I2uddgtRTdGn9a8epOUw1/Gk8AtyAkiZ86',
      token: null,
      login_at: new Date(),
      status: 1,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
