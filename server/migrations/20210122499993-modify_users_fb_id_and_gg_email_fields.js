'use strict';

const oldNameColumn = "fb_email";
const newNameColumn = "fbUID";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users',
        'fbUID'
    );
    await queryInterface.removeColumn('users',
        'gg_email',
    );
    await queryInterface.removeColumn('users',
        'phone'
     );
    await queryInterface.addColumn('users', 
    'fbUID', {
      type: Sequelize.STRING,
      allowNull: true,
      after: "id"
    }
    );
    await queryInterface.addColumn('users', 
    'gg_email', {
      type: Sequelize.STRING,
      allowNull: true,
      after: "fbUID"
    }
    );
    await queryInterface.addColumn('users', 
    'phone', {
      type: Sequelize.STRING,
      allowNull: true,
      after: "gg_email"
    }
    );
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.addColumn('users',
    //     'permission_id',
    //     {
    //       type: Sequelize.INTEGER,
    //       allowNull: false
    //     }
    // );
  }
};
