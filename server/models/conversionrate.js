'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConversionRate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ConversionRate.init({
    number: DataTypes.INTEGER, // tỷ lệ chuyển đổi
    type: DataTypes.STRING // VNĐ , USD
  }, {
    sequelize,
    modelName: 'ConversionRate',
  });
  return ConversionRate;
};
