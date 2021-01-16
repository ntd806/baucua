'use strict';
const Main = require('./AllModel');
const Sequelize = require('sequelize');


module.exports = class Character extends Main {

  constructor() {
    super();
    this.mCharacter = this.mainCharacter();
    this.mOption = this.mainOption();
    this.Op = Sequelize.Op;
    this.mCharacter.hasOne(this.mOption, {foreignKey: 'game_type', sourceKey:'game_type'});
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