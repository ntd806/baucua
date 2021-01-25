'use strict';
const Main = require('./AllModel');
const { Op } = require('sequelize');


module.exports = class UserLogin extends Main {

  constructor() {
    super();
    this.mUserLogin = this.mainUserLogin();
    this.mUser =this.mainUser();
    // this.Op = Sequelize.Op;
    this.mUserLogin.hasOne(this.mUser, {foreignKey: 'id', sourceKey:'user_id'});
  }

  /**
   * getUsersHistory
   * 
   * @param datetime date
   * @param string m/d/y
   */
  async getUsersHistory(data){
    let { page = 1, limit = 10} = data;
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    return await this.mUserLogin.findAll({
      include:[
        {
          model: this.mUser
        }
      ],
      where: [{
        login_at:{
          [Op.between]: [startDate, endDate]
      },
      }],
      limit: limit,
      offset: +(limit * (page-1)),
    });
  }
}