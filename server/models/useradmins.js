'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class useradmins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  useradmins.init({
    userName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
      field: 'user_name'
    },
    password: DataTypes.STRING,
    LoginAt: {
      type: DataTypes.DATE,
      field: 'login_at'
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
    modelName: 'useradmins',
  });
  return useradmins;
};