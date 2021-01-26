'use strict';
const Main = require('./AllModel');
const { Op } = require('sequelize');
const sequelize= require('sequelize');


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
      attributes:['id','user_id', 'login_at', [sequelize.fn('sum', sequelize.col('time')), 'count_time']],
      include:[
        {
          model: this.mUser,
          attributes: ['name']
        }
      ],
      where: [{
        login_at:{
          [Op.between]: [startDate, endDate]
      },
      }],
      group: ['user_id'],
      limit: limit,
      offset: +(limit * (page-1)),
      order: [
        ['login_at', 'ASC']
      ],
    });
  }
}