'use strict';

const oldNameColumn1 = "destination";
const newNameColumn1 = "destination_id";
const oldNameColumn2 = "arrival";
const newNameColumn2 = "arrival_id";

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.renameColumn('transfershistories', oldNameColumn1, newNameColumn1);
    await queryInterface.renameColumn('transfershistories', oldNameColumn2, newNameColumn2);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('transfershistories', newNameColumn1, oldNameColumn1);
    await queryInterface.renameColumn('transfershistories', newNameColumn2, oldNameColumn2);
  }
};
