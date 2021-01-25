'use strict';
const Main = require('./AllModel');
const { Op } = require('sequelize');


module.exports = class UserLogin extends Main {

  constructor() {
    super();
    this.mUserLogin = this.mainUserLogin();
  }

  /**
   * getUsersHistory
   * 
   * @param datetime date
   * @param string m/d/y
   */
  async getUsersHistory(data){
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    return await this.mUserLogin.count({
      where: [{
        login_at: {
            [Op.between]: [startDate, endDate]
        }
      }]
    });
  }
}