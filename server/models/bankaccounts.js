'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bankaccounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // will be user.users()
      users.belongsTo(models.users, { foreignKey: 'user_id', as: 'users' })
    }
  };
  bankaccounts.init({
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      },
      field: 'user_id'
    },
    amount: DataTypes.INTEGER,
    isBlock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      },
      field: 'is_block'
    },
    status: DataTypes.INTEGER,
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
    modelName: 'bankaccounts',
  });
  return bankaccounts;
};