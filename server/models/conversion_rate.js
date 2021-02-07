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

  /**
   * createConversionRates
   * Author: ntd806
   * time: 02/03/2020
   * @param {} data 
   */
  async createConversionRates(data){
    return this.mConversionRate.create(data);
  }
};
