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

}