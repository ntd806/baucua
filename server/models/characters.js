'use strict';
const Main = require('./AllModel');
const Sequelize = require('sequelize');


module.exports = class Character extends Main {
  constructor() {
    super();
    this.mOption = this.mainOption();
    this.Op = Sequelize.Op;
  }

  async getChoiceToNumbberMap(){
    return await this.mCharacter.findAll({
      include:[
        {
          model: this.mOption,
          where: {
            is_active: 1,
          }
        }
      ]
    });
  }
}