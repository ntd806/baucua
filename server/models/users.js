'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // will be user.bankaccounts()
      users.hasMany(models.bankaccounts, {as: 'bankaccounts' })
      // will be user.matcheshistory()
      users.hasMany(models.matcheshistory, {as: 'matcheshistory' })
      // will be user.matcheshistory()
      users.hasMany(models.transfershistory, {as: 'transfershistory' })
      // will be user.permission()
      users.belongsTo(models.permissions, { foreignKey: 'permission_id', as: 'permission' })
    }
  };
  users.init({
    permissionId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      },
      field: 'permission_id'
    },
    fbMail: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: false
      },
      field: 'fb_mail'
    },
    ggMail: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: false
      },
      field: 'gg_mail'
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: false
      },
      field: 'gender'
    },
    userName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
      field: 'user_name'
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.INTEGER,
    birthday: {
      type: DataTypes.DATE,
      field: 'birthday'
    },
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
    modelName: 'users',
  });
  return users;
};