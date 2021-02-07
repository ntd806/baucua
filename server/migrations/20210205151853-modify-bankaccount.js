'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('bankaccounts',
      'is_block'
    );
    await queryInterface.addColumn('bankaccounts',
    'is_block', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('bankaccounts',
    'is_block'
  );
  await queryInterface.addColumn('bankaccounts',
  'is_block', {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  });
  }
};