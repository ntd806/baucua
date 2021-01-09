'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt");

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
    fbEmail: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: false
      },
      field: 'fb_email'
    },
    ggEmail: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: false
      },
      field: 'gg_email'
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
    address: {
      type: DataTypes.STRING,
      field: 'address'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
  }, 
  {
    freezeTableName: true,
    instanceMethods: {
      generateHash(password) {
          return bcrypt.hash(password, bcrypt.genSaltSync(10));
      },
      validPassword(password) {
          return bcrypt.compare(password, this.password);
      }
    }
  },
  {
    sequelize,
    modelName: 'users',
  });
  return users;
};