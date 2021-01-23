'use strict';
const Main = require('./AllModel');


module.exports = class Option extends Main {

  constructor() {
    super();
    this.mOption = this.mainOption();
  }

  createOption(data){
    return this.mOption.create(data);
  }

  /**
   * Get option
   * Author: ntd806
   * time: 01/23/2021
   */
  async getOption(){
    return this.mOption.findAll();
  }
}