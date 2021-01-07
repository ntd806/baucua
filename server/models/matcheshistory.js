'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class matcheshistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  matcheshistory.init({
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      },
      field: 'user_id'
    },
    win: DataTypes.STRING,
    lose: DataTypes.STRING,
    typeBet: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      },
      field: 'type_bet'
    },
    placeBet: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
      field: 'place_bet'
    },
    stake: DataTypes.INTEGER,
    status: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
  }, {
    sequelize,
    modelName: 'matcheshistory',
  });
  return matcheshistory;
};