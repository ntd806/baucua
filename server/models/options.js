'use strict';
const Main = require('./AllModel');


module.exports = class Option extends Main {

  constructor() {
    super();
    this.mOption = this.mainOption();
  }

   /**
   * Create option
   * Author: ntd806
   * time: 01/23/2021
   */
  async createOption(data){
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
      let success = {};
      let optionUpdate = {};
      try {
        let valueUpdate = {};
        let remove_isplay = {};
        let id = data.id_options;
        if (typeof data.game_type ===  'string') {
          valueUpdate.game_type = data.game_type
        }
        if (typeof data.proportionality ===  'string') {
          valueUpdate.proportionality = data.proportionality
        }
        if (typeof data.is_play ===  'string') {
          valueUpdate.is_play = parseInt(data.is_play);
        }
        if (valueUpdate.is_play) {
          remove_isplay.is_play = 0;
         success = await this.mOption.update(remove_isplay, {
            where:{
              is_play: 1
            }
          });
        }
        console.log(typeof data.id_options);
        if (success) {
          optionUpdate = await this.mOption.update(valueUpdate, {
            where:{
              id: id
            }
          });
        }

        resolve(optionUpdate);
      } catch (e) {
        reject(e)
      }
    })
  }
}