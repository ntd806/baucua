'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_admins', [{
      user_name: 'admin',
      password: '$2b$10$Lj.QuhzuFTTIAnm2ZZUbnuywDEP3d/XcLHl8SADZ8/WZ0tjhEnJei',
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
