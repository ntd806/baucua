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
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: false
      },
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: false
      },
      field: 'last_name'
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: false
      },
      field: 'email'
    },
    userName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
      field: 'user_name'
    },
    role: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.INTEGER,
    tokenFace:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
      field: 'token_face'
    },
    tokenYoutu: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
      field: 'token_youtu'
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