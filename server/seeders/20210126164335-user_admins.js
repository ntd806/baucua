'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_admins', [{
      user_name: 'admin',
      password: '$2b$10$9MqbXSEa5aXXqkIch./Z4eHKoQX9VIt2P1o0edmSRXMIxhE95w1/e',
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
