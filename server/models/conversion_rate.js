'use strict';
const Main = require('./AllModel');
module.exports = class ConversionRate extends Main {
  constructor() {
    super();
    this.mConversionRate = this.mainConversionRate();
  }

  async getAll() {
    return this.mConversionRate.findAll();
  }
};
