'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert('users', [{
    //     // permission_id: 1,
    //     fb_mail: 'facebook@gmail.com',
    //     gg_mail: 'google@gmail.com',
    //     address: 'Hồ chí minh',
    //     gender: 'male',
    //     name: 'Nguyễn Tiến Đạt',
    //     birthday: '1999-01-01T00:00:00.000Z',
    //     username: 'ntd806',
    //     password: '$2y$12$x9izv7/viAuQtY8WJExG..RVELXSEgLpkaJ1t/vbM2q.ohZJNLtNC',
    //     status: 1,
    //     created_at: new Date('2021-01-01T00:00:00.000Z'),
    //     updated_at: new Date('2021-01-01T00:00:00.000Z')
    // }], {});
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
