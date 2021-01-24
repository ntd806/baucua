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

  /**
   * update option
   * Author: ntd806
   * time: 01/23/2021
   */
  async updateOption(data){
    return new Promise(async (resolve, reject) => {
      try {
        let valueUpdate = {};

        let id = data.id_options;
        if (typeof data.game_type ===  'string') {
          valueUpdate.game_type = data.game_type
        }
        if (typeof data.proportionality ===  'string') {
          valueUpdate.proportionality = data.proportionality
        }
        if (typeof data.is_play ===  'string') {
          valueUpdate.is_play = data.is_play
        }
        console.log(typeof data.id_options);
        let optionUpdate = await this.mOption.update(valueUpdate, {
          where:{
            id: id
          }
        });

        resolve(optionUpdate);
      } catch (e) {
        reject(e)
      }
    })
  }
}