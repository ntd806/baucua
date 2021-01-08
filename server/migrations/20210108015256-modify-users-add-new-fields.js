'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 
      'fb_mail', {
        type: Sequelize.STRING,
        allowNull: false,
        after: "status"
      }
    );
    await queryInterface.addColumn('users',
      'gg_mail', {
        type: Sequelize.STRING,
        allowNull: false,
        after: "fb_mail"
      }
    );
    await queryInterface.addColumn('users', 
      'address', {
        type: Sequelize.STRING,
        allowNull: false,
        after: "gg_mail"
      },
    );
   await queryInterface.addColumn('users',  
      'gender', {
        type: Sequelize.STRING,
        allowNull: false,
        after: "address"
      },
    );
   await queryInterface.addColumn('users', 
      'name', {
        type: Sequelize.STRING,
        allowNull: false,
        after: "gender"
      },
    );
    await queryInterface.addColumn('users', 
      'birthday', {
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
        after: "name"
      },
    );
    await queryInterface.removeColumn('users', 
      'email'
    );
    await queryInterface.removeColumn('users',
      'first_name'
    );
    await queryInterface.removeColumn('users',
      'last_name'
    );
   await queryInterface.removeColumn('users',  
      'token_face'
    );
   await queryInterface.removeColumn('users', 
      'token_youtu'
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users',
      'email', {
        type: Sequelize.STRING,
        allowNull: false,
      }
    );
    await queryInterface.addColumn('users', 
      'first_name', {
        type: Sequelize.STRING,
        allowNull: false,
      },
    );
   await queryInterface.addColumn('users',  
      'token_face', {
        type: Sequelize.STRING,
        allowNull: false,
      },
    );
   await queryInterface.addColumn('users', 
      'token_youtu', {
        type: Sequelize.STRING,
        allowNull: false,
      },
    );
    await queryInterface.removeColumn('users', 
      'fb_mail'
    );
    await queryInterface.removeColumn('users',
      'gg_mail'
    );
    await queryInterface.removeColumn('users', 
      'address'
    );
   await queryInterface.removeColumn('users',  
      'gender'
    );
   await queryInterface.removeColumn('users', 
      'name'
    );
    await queryInterface.removeColumn('users', 
      'birthday'
    );
  }
};
